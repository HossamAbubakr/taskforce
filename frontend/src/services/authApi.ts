import { NewUser, AuthUser, UserName } from "@customTypes/apiTypes";
import { post } from "@services/baseApi";

export async function signIn(credentials: AuthUser): Promise<UserName> {
  return post<AuthUser, UserName>("auth/login", credentials);
}

export async function signUp(newUser: NewUser): Promise<UserName> {
  return post<NewUser, UserName>("auth/signup", newUser);
}
