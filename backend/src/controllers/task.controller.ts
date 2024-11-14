import { Request, Response, NextFunction } from "express";
import { TaskService } from "../core/services/task.service";
import { CustomError } from "../util/errors";

const taskService = new TaskService();

// Retrieves tasks associated with the authenticated user
export const getTasksByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = res.locals; // Extract userId from locals
    const result = await taskService.getTasksByUserId(userId);

    if (result.status === "failed") {
      // If the result status is "failed", throw a custom error
      throw new CustomError({
        name: "TaskRetrievalError",
        message: result.error.message, // Assuming the error message is available
        statusCode: 400, // Bad Request status
      });
    }

    res.send(result.data); // Send the retrieved tasks in the response
  } catch (err) {
    next(err); // Pass errors to the next middleware (error handler)
  }
};

// Retrieves details of a specific task for the authenticated user by task ID
export const getTaskDetailsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = Number(req.params.id); // Get the task ID from request params
    const { userId: requesterId } = res.locals; // Get the authenticated user's ID from locals

    const result = await taskService.getTaskDetailsByUserId(
      taskId,
      requesterId
    );

    if (result.status === "failed") {
      // If the result status is "failed", throw a custom error
      throw new CustomError({
        name: "TaskDetailRetrievalError",
        message: result.error.message,
        statusCode: 404, // Not Found status
      });
    }

    res.send(result.data); // Send the task details in the response
  } catch (err) {
    next(err); // Pass errors to the next middleware (error handler)
  }
};

// Adds a new task for the authenticated user
export const addTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = req.body; // Get the task data from request body
    const { userId } = res.locals; // Get the authenticated user's ID from locals

    const result = await taskService.addTask({ ...task, userId });

    if (result.status === "failed") {
      // If the result status is "failed", throw a custom error
      throw new CustomError({
        name: "TaskCreationError",
        message: result.error.message,
        statusCode: 400, // Bad Request status
      });
    }

    res.status(201).send(result.data); // Respond with the created task data
  } catch (err) {
    next(err); // Pass errors to the next middleware (error handler)
  }
};

// Updates an existing task for the authenticated user
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = req.body; // Get the updated task data from request body
    const { userId } = res.locals; // Get the authenticated user's ID from locals

    const result = await taskService.updateTask({ ...task, userId });

    if (result.status === "failed") {
      // If the result status is "failed", throw a custom error
      throw new CustomError({
        name: "TaskUpdateError",
        message: result.error.message,
        statusCode: 400, // Bad Request status
      });
    }

    res.send(result.data); // Send the updated task data in the response
  } catch (err) {
    next(err); // Pass errors to the next middleware (error handler)
  }
};

// Deletes a task for the authenticated user by task ID
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.body.id; // Get the task ID from request body
    const { userId } = res.locals; // Get the authenticated user's ID from locals

    const result = await taskService.deleteTask(taskId, userId);

    if (result.status === "failed") {
      // If the result status is "failed", throw a custom error
      throw new CustomError({
        name: "TaskDeletionError",
        message: result.error.message,
        statusCode: 400, // Bad Request status
      });
    }

    res.send(result.data); // Send the response with deleted task data or a success message
  } catch (err) {
    next(err); // Pass errors to the next middleware (error handler)
  }
};
