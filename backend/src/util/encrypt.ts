import { compare, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
const {
  PEPPER: pepper,
  SALT_ROUNDS: saltRounds,
  TOKEN_SECRET,
  TOKEN_EXPIRE,
} = process.env;

export function hashPassword(password: string): string {
  return hashSync(password + pepper, Number(saltRounds));
}

export async function compareHash(
  password: string,
  hash: string
): Promise<boolean> {
  return await compare(password + pepper, hash);
}

export function signToken(userId: number) {
  return sign({ userId }, TOKEN_SECRET as string, {
    expiresIn: TOKEN_EXPIRE as string,
  });
}
