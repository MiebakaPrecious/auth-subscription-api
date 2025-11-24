import { Router } from "express";
import {
  createSubscription,
  renewSubscription,
  cancelSubscription,
  getSubscriptionStatus,
} from "../controllers/subscription.controller";

const router = Router();

// Create new subscription
router.post("/subscribe", createSubscription);

// Renew subscription
router.post("/renew", renewSubscription);

// Cancel subscription
router.post("/cancel", cancelSubscription);

// Check subscription status
router.get("/status/:userId", getSubscriptionStatus);

export default router;