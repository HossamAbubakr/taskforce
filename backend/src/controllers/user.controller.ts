import { Request, Response, NextFunction } from "express";
import { UserService } from "../core/services/user.service";
import { CustomError } from "../util/errors";

const userService = new UserService();

// Retrieves details of a user by their ID
export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.id); // Get the user ID from params
    const { userId: requesterId } = res.locals; // Get the requester’s ID from locals

    // Call the user service to fetch user details
    const result = await userService.getUserDetails(userId, requesterId);

    if (result.status === "failed") {
      // If the result status is "failed", throw a custom error
      throw new CustomError({
        name: "UserRetrievalError",
        message: result.error.message, // Assuming the error message is available
        statusCode: 404, // Not Found status
      });
    }

    res.send(result.data); // Send the user details in the response
  } catch (err) {
    next(err); // Pass any errors to the next middleware (error handler)
  }
};

// Updates a user's details using the provided data
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body; // Get the updated user data from request body
    const { userId } = res.locals; // Get the authenticated user's ID from locals

    const result = await userService.updateUser({
      ...user,
      id: userId,
    });

    if (result.status === "failed") {
      // If the result status is "failed", throw a custom error
      throw new CustomError({
        name: "UserUpdateError",
        message: result.error.message,
        statusCode: 400, // Bad Request status
      });
    }

    res.send(result.data); // Send the updated user data in the response
  } catch (err) {
    next(err); // Pass any errors to the next middleware (error handler)
  }
};

// Deletes a user by their ID
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.id; // Get the user ID from request body
    const { userId: requesterId } = res.locals; // Get the requester’s ID from locals

    const result = await userService.deleteUser(userId, requesterId);

    if (result.status === "failed") {
      // If the result status is "failed", throw a custom error
      throw new CustomError({
        name: "UserDeletionError",
        message: result.error.message,
        statusCode: 400, // Bad Request status
      });
    }

    res.send(result.data); // Send the response with deleted user data or success message
  } catch (err) {
    next(err); // Pass any errors to the next middleware (error handler)
  }
};
