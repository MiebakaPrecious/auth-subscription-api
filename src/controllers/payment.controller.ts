import { Request, Response } from "express";
import { processPayment } from "../services/payment.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const makePayment = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { plan } = req.body; // "monthly" | "yearly"

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!plan) {
      return res.status(400).json({ message: "Plan is required" });
    }

    if (plan !== "monthly" && plan !== "yearly") {
      return res.status(400).json({ message: "Invalid plan selected" });
    }

    // Mock payment processing
    const paymentResult = await processPayment(userId, plan);

    if (!paymentResult.success) {
      return res.status(400).json({
        message: "Payment failed",
        error: paymentResult.error,
      });
    }

    return res.status(200).json({
      message: "Payment successful!",
      subscription: paymentResult.subscription,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Payment processing error",
      error: error.message,
    });
  }
};

// OPTIONAL — for real payment gateways later (Paystack, Stripe)
export const verifyPayment = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Payment verification placeholder" });
};