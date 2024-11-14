import { User } from "../entity/user";
import { UserUseCase } from "../use-case/user.use-case";
import userModel from "../../model/user.model";
import { Status } from "../entity/status";
import { hashPassword } from "../../util/encrypt";
import { forbiddenAccess, handleGlobalError } from "../../util/errors";

export class UserService implements UserUseCase {
  // Retrieves user details if the requester has permission
  async getUserDetails(
    userId: number,
    RequesterId: number
  ): Promise<Status<User>> {
    try {
      const user = await userModel.getUserById(userId);

      if (user && user.id === RequesterId) {
        return {
          status: "success",
          data: user,
        };
      }
      return forbiddenAccess("user");
    } catch (error) {
      return handleGlobalError(error);
    }
  }

  // Updates user information, ensuring the user is modifying their own data
  async updateUser(user: User): Promise<Status<User>> {
    try {
      const existingUser = await userModel.getUserById(user.id);

      if (!existingUser || user.id !== existingUser.id) {
        return forbiddenAccess("user");
      }

      const hashedPassword = hashPassword(user.password);
      const updatedUser = await userModel.updateUser({
        ...user,
        password: hashedPassword,
      });

      return {
        status: "success",
        data: updatedUser,
      };
    } catch (error) {
      return handleGlobalError(error);
    }
  }

  // Deletes a user if the requester has the proper authorization
  async deleteUser(userId: number, RequesterId: number): Promise<Status<User>> {
    try {
      const existingUser = await userModel.getUserById(userId);

      if (existingUser && RequesterId !== existingUser.id) {
        return forbiddenAccess("user");
      }

      const result = await userModel.deleteUser(userId);

      return {
        status: "success",
        data: result,
      };
    } catch (error) {
      return handleGlobalError(error);
    }
  }
}
