export enum Status {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export type User = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
};

export type UserName = {
  name: string;
};

export type NewUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthUser = {
  email: string;
  password: string;
};

export type UpdatedUser = {
  name?: string;
  email?: string;
  password?: string;
};

export type Task = {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: Status;
  due_date: Date;
};

export type NewTask = {
  title: string;
  description: string;
  dueDate: string;
};
export type UpdatedTask = {
  title?: string;
  description?: string;
  dueDate?: string;
};

export type ApiResponse<T> = {
  data: T;
};

export type ApiSuccess = {
  status: string;
};
