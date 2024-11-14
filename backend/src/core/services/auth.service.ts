import { User } from "../entity/user";
import { AuthUseCase } from "../use-case/auth.use-case";
import userModel from "../../model/user.model";
import { Status } from "../entity/status";
import { hashPassword, compareHash } from "../../util/encrypt";
import { handleGlobalError } from "../../util/errors";
import {
  RegisterData,
  LoginData,
  isValidRegisterObject,
  isValidLoginObject,
} from "../entity/auth";

export class AuthService implements AuthUseCase {
  // Handles user registration by validating data and creating a new user
  async signUp({
    confirmPassword,
    ...userData
  }: RegisterData): Promise<Status<User>> {
    try {
      // Validates registration data including password confirmation
      const isValidRegisterDate = isValidRegisterObject({
        confirmPassword,
        ...userData,
      });

      if (isValidRegisterDate.status === "failed") {
        return isValidRegisterDate;
      }

      // Checks if a user with the same email already exists
      const existingUser = await userModel.getUserByEmail(userData.email);

      if (existingUser) {
        return {
          status: "failed",
          error: new Error("User already exists"),
        };
      }

      // Hashes the password before storing it
      const password = hashPassword(userData.password);

      // Creates a new user in the database
      const newUser = await userModel.createUser({ ...userData, password });

      return {
        status: "success",
        data: { ...newUser, password: "" }, // Do not return password in the response
      };
    } catch (error) {
      // Handles any unexpected errors that may occur during signup
      return handleGlobalError(error);
    }
  }

  // Handles user login by validating credentials and comparing the password
  async signIn(loginData: LoginData): Promise<Status<User>> {
    try {
      // Validates login data
      const isValidLoginDate = isValidLoginObject(loginData);

      if (isValidLoginDate.status === "failed") {
        return isValidLoginDate;
      }

      // Checks if a user exists with the provided email
      const existingUser = await userModel.getUserByEmail(loginData.email);

      if (!existingUser) {
        return {
          status: "failed",
          error: new Error("invalid credentials"),
        };
      }

      // Compares the provided password with the stored hash
      const passwordMatch = await compareHash(
        loginData.password,
        existingUser.password
      );

      if (!existingUser || !passwordMatch) {
        return {
          status: "failed",
          error: new Error("invalid credentials"),
        };
      }

      return {
        status: "success",
        data: { ...existingUser, password: "" }, // Do not return password in the response
      };
    } catch (error) {
      // Handles any unexpected errors during login
      return handleGlobalError(error);
    }
  }
}
