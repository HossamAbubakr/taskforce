import { Task, NewTask, UpdatedTask } from "@customTypes/apiTypes";
import { get, post, put, del } from "@services/baseApi";

export async function getTasks(): Promise<Task[]> {
  return get<Task[]>("tasks");
}

export async function getTask(id: number): Promise<Task> {
  return get<Task>(`tasks/${id}`);
}

export async function createTask(newTask: NewTask): Promise<Task> {
  return post<NewTask, Task>("tasks", newTask);
}

export async function updateTask(
  id: number,
  updatedTask: UpdatedTask
): Promise<Task> {
  return put<UpdatedTask, Task>(`tasks/${id}`, updatedTask);
}

export async function deleteTask(id: number): Promise<void> {
  return del<void>(`tasks/${id}`);
}
