import { ApiSuccess, NewTask, NewUser, Task, UserName } from "./apiTypes";

export type TaskContextType = {
  tasks: Task[];
  task: Task | null;
  fetchTasks: () => Promise<void>;
  fetchTask: (id: number) => Promise<void>;
  createTask: (task: NewTask) => Promise<void>;
  updateTask: (id: number, task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
};

export type AuthContextType = {
  user: UserName | null;
  isAuthed: boolean;
  signIn: (email: string, password: string) => Promise<ApiSuccess | undefined>;
  signUp: (user: NewUser) => Promise<ApiSuccess | undefined>;
  signOut: () => void;
};
