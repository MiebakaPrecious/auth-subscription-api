import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import subscriptionRoutes from "./routes/subscription.routes";



// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);


// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API is running 🚀" });
});

// Subscription routes
app.use("/api/subscriptions", subscriptionRoutes);

export default app;
