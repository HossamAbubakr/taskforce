import { Prisma } from "@prisma/client";
import jwt, {
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError,
} from "jsonwebtoken";

// Type for handling different error types (Prisma, JWT, and generic errors)
export type AppError =
  | Prisma.PrismaClientKnownRequestError
  | jwt.JsonWebTokenError
  | Error;

// Type for custom error details (name, message, and statusCode)
export type CustomErrorType = {
  name: string;
  message: string;
  statusCode: number;
};

// Custom error class for handling application-specific errors
export class CustomError extends Error {
  statusCode: number;

  // Use destructuring for the constructor
  constructor({ name, message, statusCode }: CustomErrorType) {
    super(message);
    this.name = name || "CustomError";
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

// Handles Prisma-specific errors and returns a formatted custom error
function handlePrismaError(
  err: Prisma.PrismaClientKnownRequestError
): CustomErrorType {
  switch (err.code) {
    case "P2002":
      return {
        name: "ValidationError",
        message: `Duplicate field value: ${err.meta?.target}`,
        statusCode: 400,
      };
    case "P2003":
      return {
        name: "ValidationError",
        message: `Foreign key constraint failed on the field: ${err.meta?.field_name}`,
        statusCode: 400,
      };
    case "P2004":
      return {
        name: "ValidationError",
        message: `A constraint failed on the database: ${err.meta?.cause}`,
        statusCode: 400,
      };
    case "P2005":
      return {
        name: "ValidationError",
        message: `Invalid value for field: ${err.meta?.field_name}`,
        statusCode: 400,
      };
    case "P2006":
      return {
        name: "ValidationError",
        message: `The provided value for the field is too long: ${err.meta?.field_name}`,
        statusCode: 400,
      };
    case "P2011":
      return {
        name: "ValidationError",
        message: `Null constraint violation on the field: ${err.meta?.field_name}`,
        statusCode: 400,
      };
    case "P2014":
      return {
        name: "ValidationError",
        message: `Invalid ID: ${err.meta?.target}`,
        statusCode: 400,
      };
    case "P2018":
      return {
        name: "NotFoundError",
        message: `The required connected records were not found`,
        statusCode: 404,
      };
    case "P2025":
      return {
        name: "NotFoundError",
        message: `Record to delete does not exist`,
        statusCode: 404,
      };
    default:
      return {
        name: "InternalServerError",
        message: `Something went wrong: ${err.message}`,
        statusCode: 500,
      };
  }
}

// Handles JWT-specific errors and returns a formatted custom error
function handleJwtError(err: jwt.JsonWebTokenError): CustomErrorType {
  if (err instanceof TokenExpiredError) {
    return {
      name: "TokenExpiredError",
      message: "JWT token has expired",
      statusCode: 401,
    };
  } else if (err instanceof NotBeforeError) {
    return {
      name: "NotBeforeError",
      message: "JWT token is not active yet",
      statusCode: 401,
    };
  } else if (err instanceof JsonWebTokenError) {
    return {
      name: "JsonWebTokenError",
      message: `Invalid JWT token: ${err.message}`,
      statusCode: 401,
    };
  } else {
    return {
      name: "InternalServerError",
      message: "Something went wrong",
      statusCode: 500,
    };
  }
}

// Main error handler function that distinguishes between Prisma, JWT, and other errors
export function handleError(err: AppError): CustomErrorType {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(err);
  } else if (err instanceof jwt.JsonWebTokenError) {
    return handleJwtError(err);
  } else {
    return {
      name: "InternalServerError",
      message: `Something went wrong: ${err.message}`,
      statusCode: 500,
    };
  }
}
