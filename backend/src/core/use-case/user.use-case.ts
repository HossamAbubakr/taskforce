import { Status } from "../entity/status";
import { User } from "../entity/user";

export interface UserUseCase {
    getUserDetails(id: number, RequesterId: number): Promise<Status<User>>;
    updateUser(user: User): Promise<Status<User>>;
    deleteUser(id: number, RequesterId: number): Promise<Status<User>>;
}