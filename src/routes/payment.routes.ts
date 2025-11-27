import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { subscriptionRequired } from "../middleware/subscription.middleware";
import { makePayment } from "../controllers/payment.controller";

const router = Router();

// Process a payment for subscription
// User must be logged in first, no need for active subscription
router.post("/", authMiddleware, makePayment);

export default router;