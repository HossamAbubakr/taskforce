import { Request, Response, NextFunction } from "express";
import { AuthService } from "../core/services/auth.service";
import { LoginData, RegisterData } from "@/core/entity/auth";
import { signToken } from "../util/encrypt";
import { CustomError } from "../util/errors";

const authService = new AuthService();

// SignUp Function: Registers a new user
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerUser: RegisterData = req.body; // Get the registration data from the request

    // Call the signUp service to create the user
    const newUser = await authService.signUp(registerUser);

    // Check if the signUp process failed
    if (newUser.status === "failed") {
      // Throw a CustomError with appropriate message and status code
      throw new CustomError({
        name: "UserCreationError",
        message: newUser.error.message, // Assuming newUser.error contains a message
        statusCode: 400, // Custom error code for failed registration
      });
    }

    // If user creation is successful, generate a JWT token
    const jwt = signToken(newUser.data.id);

    // Send the JWT token in a cookie
    res.cookie("accessToken", jwt, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 604800000, // 1 week
    });

    // Respond with the created user's data
    res.status(201).json(newUser.data);
  } catch (err) {
    // Catch any errors and pass them to the error handler middleware
    next(err);
  }
};

// SignIn Function: Authenticates a user and returns their data along with a JWT token
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginData: LoginData = req.body; // Get login data from the request

    // Call the signIn service to authenticate the user
    const currentUser = await authService.signIn(loginData);

    // Check if the signIn process failed
    if (currentUser.status === "failed") {
      // Throw a CustomError with the error message from the service
      throw new CustomError({
        name: "AuthenticationError",
        message: currentUser.error.message, // Assuming currentUser.error contains a message
        statusCode: 401, // Unauthorized status code
      });
    }

    // If authentication is successful, generate a JWT token
    const jwt = signToken(currentUser.data.id);

    // Send the JWT token in a cookie
    res.cookie("accessToken", jwt, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 604800000, // 1 week
    });

    // Respond with the authenticated user's data
    res.status(200).json(currentUser.data);
  } catch (err) {
    // Catch any errors and pass them to the error handler middleware
    next(err);
  }
};
