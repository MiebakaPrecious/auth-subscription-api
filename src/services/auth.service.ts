import jwt, { Secret } from "jsonwebtoken";

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET as Secret,
    { expiresIn: "7d" }
  );

  return { token, user };
};
import User, { IUser } from "../models/user.model";

export const registerUser = async (fullName: string, email: string, password: string): Promise<IUser> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email is already registered");
  }

  const newUser = new User({
    name: fullName,
    email,
    password,
  });

  await newUser.save();
  return newUser;
};