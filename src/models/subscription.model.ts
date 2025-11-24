import { Schema, model, Document, Types } from "mongoose";

export interface ISubscription extends Document {
  user: Types.ObjectId;
  plan: "free" | "basic" | "pro" | "enterprise";
  status: "active" | "expired" | "canceled";
  expiresAt: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // 1 user = 1 subscription
    },
    plan: {
      type: String,
      enum: ["free", "basic", "pro", "enterprise"],
      required: true,
      default: "free",
    },
    status: {
      type: String,
      enum: ["active", "expired", "canceled"],
      default: "active",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Subscription = model<ISubscription>("Subscription", subscriptionSchema);

export default Subscription;