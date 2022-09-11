/** Dependency Imports */
import express from "express";
import cors from "cors";
import expressSanitizer from "express-sanitizer";
import { verifyAuthentication } from "./utils/middleware/auth";

import authRouter from "./routes/auth";
import indexRouter from "./routes/index";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(expressSanitizer());

// Importing Routes
app.use("/auth", authRouter);
app.use("/api/v1", verifyAuthentication, indexRouter);

export default app;
