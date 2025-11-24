import { Request, Response } from "express";
import {
  registerUser as registerUserService,
  loginUser as loginUserService,
} from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    // Basic validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await registerUserService(fullName, email, password);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await loginUserService(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result, // includes token + user info
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

