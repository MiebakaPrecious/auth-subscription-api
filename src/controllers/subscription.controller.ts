import { Request, Response } from "express";
import { SubscriptionService } from "../services/subscription.service";

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { userId, plan } = req.body;

    if (!userId || !plan) {
      return res.status(400).json({ message: "userId and plan are required." });
    }

    const subscription = await SubscriptionService.createSubscription(userId, plan);
    return res.status(201).json({
      message: "Subscription created successfully.",
      subscription,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const renewSubscription = async (req: Request, res: Response) => {
  try {
    const { userId, plan } = req.body;

    if (!userId || !plan) {
      return res.status(400).json({ message: "userId and plan are required." });
    }

    const subscription = await SubscriptionService.renewSubscription(userId, plan);
    return res.status(200).json({
      message: "Subscription renewed successfully.",
      subscription,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const cancelSubscription = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required." });
    }

    const subscription = await SubscriptionService.cancelSubscription(userId);
    return res.status(200).json({
      message: "Subscription canceled.",
      subscription,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getSubscriptionStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId is required." });
    }

    const status = await SubscriptionService.getSubscriptionStatus(userId);
    return res.status(200).json({
      userId,
      status,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
