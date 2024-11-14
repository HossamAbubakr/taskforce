import { Prisma, User } from "@prisma/client";
import db from "./database";

const userModel = {
  getUserByEmail: async (email: string) =>
    await db.user.findFirst({ where: { email } }),
  getUserById: async (userId: number) =>
    await db.user.findFirst({
      where: { id: userId },
    }),
  createUser: async (user: Prisma.UserCreateInput) => {
    return await db.user.create({ data: user });
  },
  updateUser: async (user: Partial<User>) => {
    return await db.user.update({ where: { id: user.id }, data: user });
  },
  deleteUser: async (id: number) => {
    return await db.user.delete({ where: { id } });
  },
};

export default userModel;
