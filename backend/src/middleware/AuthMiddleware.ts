import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import {
  CustomError,
  CustomErrorType,
  handleError,
} from "../core/services/error.service";

// Middleware to verify JWT token and grant access based on authentication status
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    const customError: CustomErrorType = {
      name: "AuthenticationError",
      message: "No token provided, authorization denied",
      statusCode: 401,
    };
    return next(new CustomError(customError));
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as JwtPayload;

    if (!decodedToken.userId) {
      throw new CustomError({
        name: "ValidationError",
        message: "Token does not contain userId",
        statusCode: 400,
      });
    }

    res.locals.userId = decodedToken.userId;
    next();
  } catch (err) {
    const handledError = handleError(err as JsonWebTokenError);
    next(new CustomError(handledError));
  }
};

export default authMiddleware;
