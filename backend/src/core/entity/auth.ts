import { z } from "zod";
import { userSchema } from "./user";
import { Status } from "./status";

// Defines the schema for login, which includes email and password
export const loginSchema = userSchema
  .pick({
    email: true,
    password: true,
  })
  .extend({
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
  });

// Defines the schema for registration, which includes name, email, password, and confirmPassword
export const registerSchema = loginSchema
  .extend({
    name: z.string().min(1, { message: "Name is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  }) as unknown as z.ZodObject<
  typeof loginSchema.shape & {
    name: z.ZodString;
    confirmPassword: z.ZodString;
  }
>;

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

// Function to validate a schema object and return the status
export const isValidSchemaObject = <T>(
  schema: z.Schema,
  data: T
): Status<T> => {
  const { success, error } = schema.safeParse(data);

  if (!success) {
    return {
      status: "failed",
      error: error,
    };
  }

  return {
    status: "success",
    data,
  };
};

export const isValidLoginObject = (data: LoginData): Status<LoginData> =>
  isValidSchemaObject(loginSchema, data);

export const isValidRegisterObject = (
  data: RegisterData
): Status<RegisterData> => isValidSchemaObject(registerSchema, data);
