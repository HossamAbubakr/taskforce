import { Status } from "../entity/status";
import { Task } from "../entity/task";

export interface TaskUseCase {
    getTasksByUserId(userId: number): Promise<Status<Task[]>>;
    getTaskDetailsByUserId(userId: number, RequesterId: number): Promise<Status<Task>>;
    addTask(task: Task): Promise<Status<Task>>;
    updateTask(task: Task): Promise<Status<Task>>;
    deleteTask(taskId: number, userId: number): Promise<Status<Task>>;
}