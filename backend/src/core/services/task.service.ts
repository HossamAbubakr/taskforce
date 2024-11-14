import { TaskUseCase } from "../use-case/task.use-case";
import taskModel from "../../model/task.model";
import { Status } from "../entity/status";
import { forbiddenAccess, handleGlobalError } from "../../util/errors";
import { Task } from "../entity/task";

export class TaskService implements TaskUseCase {
  // Retrieves tasks associated with a specific user
  async getTasksByUserId(userId: number): Promise<Status<Task[]>> {
    try {
      const tasks = await taskModel.findTasksByUserId(userId);

      return {
        status: "success",
        data: tasks,
      };
    } catch (error) {
      return handleGlobalError(error);
    }
  }

  // Retrieves detailed task information for a user if they have access
  async getTaskDetailsByUserId(
    userId: number,
    RequesterId: number
  ): Promise<Status<Task>> {
    try {
      const task = await taskModel.findTaskByUserId(userId);

      if (task.userId !== RequesterId) {
        return forbiddenAccess("task");
      }
      return {
        status: "success",
        data: task,
      };
    } catch (error) {
      return handleGlobalError(error);
    }
  }

  // Adds a new task to the system
  async addTask(task: Task): Promise<Status<Task>> {
    try {
      const result = await taskModel.createTask(task);

      return {
        status: "success",
        data: result,
      };
    } catch (error) {
      return handleGlobalError(error);
    }
  }

  // Updates an existing task, ensuring the user owns the task
  async updateTask(task: Task): Promise<Status<Task>> {
    try {
      const foundTask = await taskModel.findTaskById(task.id);

      if (task.userId !== foundTask.userId) {
        return forbiddenAccess("user");
      }

      const result = await taskModel.updateTask(task);

      return {
        status: "success",
        data: result,
      };
    } catch (error) {
      return handleGlobalError(error);
    }
  }

  // Deletes a task if the requester owns it
  async deleteTask(taskId: number, RequesterId: number): Promise<Status<Task>> {
    try {
      const foundTask = await taskModel.findTaskById(taskId);

      if (foundTask.userId !== RequesterId) {
        return forbiddenAccess("user");
      }

      const result = await taskModel.deleteTask(taskId);

      return {
        status: "success",
        data: result,
      };
    } catch (error) {
      return handleGlobalError(error);
    }
  }
}
