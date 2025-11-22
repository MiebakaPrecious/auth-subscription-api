import app from "./app";
import { connectDB } from "./config/db";
import { ENV } from "./config/env";

const PORT = ENV.PORT;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
