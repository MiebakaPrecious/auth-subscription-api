import Subscription, { ISubscription } from "../models/subscription.model";
import User from "../models/user.model";

export class SubscriptionService {
  // Create new subscription
  static async createSubscription(
    userId: string,
    plan: "free" | "basic" | "pro" | "enterprise"
  ): Promise<ISubscription> {
    const existing = await Subscription.findOne({ user: userId });

    if (existing) {
      throw new Error("User already has a subscription.");
    }

    const duration = this.getPlanDuration(plan);

    const subscription = new Subscription({
      user: userId,
      plan,
      expiresAt: new Date(Date.now() + duration),
    });

    await subscription.save();
    return subscription;
  }

  // Renew subscription
  static async renewSubscription(
    userId: string,
    plan: "free" | "basic" | "pro" | "enterprise"
  ): Promise<ISubscription> {
    const sub = await Subscription.findOne({ user: userId });

    if (!sub) throw new Error("Subscription not found.");

    const duration = this.getPlanDuration(plan);

    sub.plan = plan;
    sub.expiresAt = new Date(Date.now() + duration);
    sub.status = "active";

    await sub.save();
    return sub;
  }

  // Cancel subscription
  static async cancelSubscription(userId: string): Promise<ISubscription> {
    const sub = await Subscription.findOne({ user: userId });

    if (!sub) throw new Error("Subscription not found.");

    sub.status = "canceled";
    await sub.save();

    return sub;
  }

  // Check subscription status
  static async getSubscriptionStatus(
    userId: string
  ): Promise<"active" | "expired" | "canceled"> {
    const sub = await Subscription.findOne({ user: userId });

    if (!sub) throw new Error("Subscription not found.");

    // Auto update expired subs
    if (sub.expiresAt < new Date() && sub.status === "active") {
      sub.status = "expired";
      await sub.save();
    }

    return sub.status;
  }

  // Helper: duration for each plan
  private static getPlanDuration(
    plan: "free" | "basic" | "pro" | "enterprise"
  ): number {
    switch (plan) {
      case "free":
        return 7 * 24 * 60 * 60 * 1000; // 7 days
      case "basic":
        return 30 * 24 * 60 * 60 * 1000; // 30 days
      case "pro":
        return 90 * 24 * 60 * 60 * 1000; // 3 months
      case "enterprise":
        return 365 * 24 * 60 * 60 * 1000; // 1 year
      default:
        return 0;
    }
  }
}
