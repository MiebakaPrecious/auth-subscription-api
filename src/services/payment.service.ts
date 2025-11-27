import Subscription from "../models/subscription.model";

export const processPayment = async (
  userId: string,
  plan: string
) => {
  try {
    // Determine subscription duration based on plan
    const durationDays = plan === "monthly" ? 30 : 365;

    let subscription = await Subscription.findOne({ user: userId });

    const startDate = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(startDate.getDate() + durationDays);

    if (!subscription) {
      // Create new subscription
      subscription = await Subscription.create({
        user: userId,
        plan,
        expiresAt,
        status: "active",
      });
    } else {
      // Renew existing subscription
      subscription.plan = plan as any;
      subscription.expiresAt = expiresAt;
      subscription.status = "active";

      await subscription.save();
    }

    return {
      success: true,
      message: "Payment processed and subscription activated",
      subscription,
    };
  } catch (error: any) {
    return { success: false, message: "Payment failed", error };
  }
};
