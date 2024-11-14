import { z } from "zod";

// Base schema for a task
export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.enum(["OPEN", "CLOSED"]),
  due_date: z.date().default(new Date()),
  updatedAt: z.date(),
  userId: z.number(),
});

// Schema for the task ID, which is used for delete or specific task retrieval
export const idSchema = taskSchema.pick({ id: true });

// Schema for creating a task (excluding the task ID)
export const createTaskSchema = taskSchema.pick({
  title: true,
  description: true,
  status: true,
  due_date: true,
});

// Update task schema where at least one of title, description, status, or due_date is provided
export const updateTaskSchema = z
  .object({
    id: z.number(), // id is required
    userId: z.number(), // userId is required
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(["OPEN", "CLOSED"]).optional(),
    due_date: z.date().optional(),
  })
  .refine(
    (data) => {
      const updateFields = [
        data.title,
        data.description,
        data.status,
        data.due_date,
      ];
      const nonNullFields = updateFields.filter((field) => field !== undefined);
      return nonNullFields.length === 1;
    },
    {
      message:
        "At least one of title, description, status, or due_date must be provided, but only one can be provided.",
      path: ["title", "description", "status", "due_date"],
    }
  ) as unknown as z.ZodObject<typeof taskSchema.shape>;

export type TaskId = z.infer<typeof idSchema>;
export type Task = z.infer<typeof taskSchema>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
