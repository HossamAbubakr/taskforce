import { z } from "zod";

// Defines the schema for a full user object including ID, name, email, and password
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

// Schema for extracting just the user ID from a user object
export const idSchema = userSchema.pick({ id: true });

// Schema for creating a new user (requires name, email, and password, but not the ID)
export const createSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
});

export type UserId = z.infer<typeof idSchema>;
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createSchema>;
