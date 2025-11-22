import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  subscription?: mongoose.Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;

  // instance method
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10", 10);

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", default: null },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving (only when modified/new)
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashed = await bcrypt.hash(this.password, salt);
    this.password = hashed;
    next();
  } catch (err) {
    next(err as any);
  }
});

// Instance method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
