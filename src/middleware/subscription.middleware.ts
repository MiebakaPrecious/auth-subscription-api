import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import Subscription from "../models/subscription.model";

export const subscriptionRequired = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const subscription = await Subscription.findOne({ user: userId });

    if (!subscription) {
      return res.status(403).json({ message: "No subscription found" });
    }

    // Auto-expire if past end date
    if (subscription.status === "active" && subscription.expiresAt < new Date()) {
      subscription.status = "expired";
      await subscription.save();
    }

    if (subscription.status !== "active") {
      return res.status(403).json({
        message: "Your subscription is not active. Renew to continue.",
        status: subscription.status,
      });
    }

    next();
  } catch (error: any) {
    return res.status(500).json({ message: "Subscription check failed" });
  }
};