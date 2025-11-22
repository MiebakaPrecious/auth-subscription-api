import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || "5000",
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "defaultsecret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
};
