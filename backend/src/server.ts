import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/Index";
import errorHandler from "./middleware/ErrorMiddlware";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS setup
app.use(
  cors({
    origin: "http://localhost:3000", //
    credentials: true,
  })
);

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// Redirect "/" to "/api"
app.get("/", (req, res) => {
  res.redirect("/api");
});

// Use the routes for API
app.use("/api", routes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
