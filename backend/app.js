const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
require("dotenv").config();

const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const credentialas = require("./middleware/Credentials");
const corsOptions = require("./config/corsOptions");
const { runPollLifecycleJob } = require("./jobs/pollLifecycle.job");
app.use(logger);
app.use(express.urlencoded({ extended: false })); // built-in middleware to handle urlencoded data
app.use(express.json());
app.use(credentialas);

app.use(cors(corsOptions));

// middlware for cookies
app.use(cookieParser());

app.use("/api/v1/auth/register", require("./routes/api/signUpApi"));

app.use("/api/v1/auth/login", require("./routes/api/login"));

app.use("/api/v1/auth/refresh", require("./routes/api/refresh"));

app.use("/api/v1/auth/logout", require("./routes/api/logout"));

app.use("/api/v1/users", require("./routes/api/Users"));

app.use("/api/v1/polls", require("./routes/api/poll.routes"));

app.use("/api/v1/notifications", require("./routes/api/notificationRoute"));

app.use((req, res) => {
  res.status(404).send(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

module.exports = app;
