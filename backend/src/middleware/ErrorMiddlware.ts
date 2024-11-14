import { Request, Response, NextFunction } from "express";
import { CustomErrorType } from "../core/services/error.service";

// Middleware to handle errors and send appropriate HTTP response
const errorHandler = (
  err: CustomErrorType,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.name && err.statusCode) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

export default errorHandler;
