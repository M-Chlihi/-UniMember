const env = require("./config/env");
const app = require("./app");
const { startJobs } = require("./Jobs");
const connectDB = require("./config/dbConn");
const PORT = env.PORT;
const mongoose = require("mongoose");

const startServer = async () => {
  let stopJobs;

  try {
    await connectDB();

    stopJobs = await startJobs();

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

    const shutdown = async (signal) => {
      console.log(`${signal} received. Shutting down...`);

      stopJobs?.();

      server.close(async () => {
        try {
          await mongoose.connection.close();
          console.log("Server shut down cleanly.");
          process.exit(0);
        } catch (err) {
          console.error("Database shutdown failed:", err.message);
          process.exit(1);
        }
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (err) {
    console.error("Server startup failed:", err.message);
    process.exit(1);
  }
};

startServer();
