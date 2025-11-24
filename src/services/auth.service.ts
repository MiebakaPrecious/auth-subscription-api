import UserModel, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

interface RegisterInput {
  name?: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: IUser;
  token: string;
}

// Generate JWT
const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  });
};

// Register
export const registerUser = async (data: RegisterInput): Promise<AuthResponse> => {
  const { name, email, password } = data;

  // Check if user already exists
  const existing = await UserModel.findOne({ email });
  if (existing) {
    throw new Error("Email already in use");
  }

  // Create user
  const user = await UserModel.create({
    name,
    email,
    password,
  });

  const token = generateToken(user._id.toString());

  return { user, token };
};

// Login
export const loginUser = async (data: LoginInput): Promise<AuthResponse> => {
  const { email, password } = data;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id.toString());

  return { user, token };
};