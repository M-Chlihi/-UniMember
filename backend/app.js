const express = require("express");
const helmet = require("helmet");
const app = express();
app.use(helmet());

const { authRateLimiter } = require("./middleware/rateLimiter");
const cors = require("cors");
const compression = require("compression");
app.use(compression());
require("./config/env");
const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const credentialas = require("./middleware/Credentials");
const corsOptions = require("./config/corsOptions");
app.disable("x-powered-by");
app.use(logger);
app.use(express.urlencoded({ extended: false })); // built-in middleware to handle urlencoded data
app.use(express.json());
app.use(credentialas);

app.use(cors(corsOptions));
app.use(compression());

// middlware for cookies
app.use(cookieParser());

app.use(
  "/api/v1/auth/register",
  require("./routes/api/signUpApi"),
  authRateLimiter,
);

app.use("/api/v1/auth/login", require("./routes/api/login"), authRateLimiter);

app.use("/api/v1/auth/refresh", require("./routes/api/refresh"));

app.use("/api/v1/auth/logout", require("./routes/api/logout"));

app.use("/api/v1/users", require("./routes/api/Users"));

app.use("/api/v1/polls", require("./routes/api/poll.routes"));

app.use("/api/v1/notifications", require("./routes/api/notificationRoute"));
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "UniMember API",
  });
});
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use(errorHandler);

module.exports = app;
