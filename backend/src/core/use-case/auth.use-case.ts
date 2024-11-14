import { RegisterData, LoginData } from "../entity/auth";
import { Status } from "../entity/status";
import {  User } from "../entity/user";

export interface AuthUseCase {
    signUp(user: RegisterData): Promise<Status<User>>;
    signIn(user: LoginData): Promise<Status<User>>;
}