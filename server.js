const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
require("dotenv").config();

const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentialas = require("./middleware/Credentials");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const { runPollLifecycleJob } = require("./jobs/pollLifecycle.job");
const PORT = process.env.PORT || 3500;
app.use(logger);
app.use(express.urlencoded({ extended: false })); // built-in middleware to handle urlencoded data
app.use(express.json());
app.use(credentialas);

app.use(cors(corsOptions));

// middlware for cookies
app.use(cookieParser());

app.use("/regUsers", require("./routes/api/signUpApi"));
app.use("/login", require("./routes/api/login"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/users", require("./routes/api/users"));
app.use("/logout", require("./routes/api/logout"));
// app.use(verifyJWT);
app.use("/api/v1/polls", require("./routes/api/poll.routes"));

app.use((req, res) => {
  res.status(404).send(path.join(__dirname, "views", "404.html"));
});
// just for testing
const now = new Date();
const startsAt = new Date(now.getTime() + 60 * 1000);
const endsAt = new Date(now.getTime() + 180 * 1000);
console.log(startsAt.toISOString());
console.log(endsAt.toISOString());
// just for testing

app.use(errorHandler);
const startServer = async () => {
  await connectDB();
  //run lifecycle job once AND start the intervall
  await runPollLifecycleJob();
  setInterval(runPollLifecycleJob, 10_000);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
