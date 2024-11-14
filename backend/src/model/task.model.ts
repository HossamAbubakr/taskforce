import { Task } from "@prisma/client";
import db from "./database";

const taskModel = {
  findTasksByUserId: async (userId: number) =>
    await db.task.findMany({ where: { userId } }),
  findTaskByUserId: async (userId: number) =>
    await db.task.findFirstOrThrow({
      where: { userId },
    }),
  findTaskById: async (taskId: number) =>
    await db.task.findFirstOrThrow({
      where: { id: taskId },
    }),
  createTask: async (task: Task) =>
    await await db.task.create({ data: task }),
  updateTask: async (task: Task) =>
    await db.task.update({ where: { id: task.id }, data: task }),
  deleteTask: async (taskId: number) =>
    await db.task.delete({ where: { id: taskId } }),
};

export default taskModel;
