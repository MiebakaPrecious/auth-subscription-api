import mongoose from "mongoose";
import { ENV } from "./env";
import { URL } from "url";

const maskUri = (uri: string) => {
  try {
    const u = new URL(uri);
    if (u.password) u.password = "****";
    return u.toString();
  } catch (err) {
    return uri;
  }
};

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    const options: any = {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    console.log(`Connecting to MongoDB at ${maskUri(ENV.MONGO_URI)}`);
    await mongoose.connect(ENV.MONGO_URI, options);
    console.log("MongoDB connected successfully 🚀");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    console.error("Check: 1) MongoDB is running 2) MONGO_URI is correct 3) host/port reachable from this process");
    console.error("If using Docker/devcontainer, use the Mongo service name in compose or host.docker.internal for host access.");
    process.exit(1);
  }
};
