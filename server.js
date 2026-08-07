const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");

const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;
app.use(logger);
app.use(express.urlencoded({ extended: false })); // built-in middleware to handle urlencoded data
app.use(express.json());
app.use(cors(corsOptions));

app.use("/employees", require("./routes/api/employees"));
app.use("/regUsers", require("./routes/api/signUpApi"));
app.use("/login", require("./routes/api/login"));

app.use((req, res) => {
  res.status(404).send(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);
app.listen(PORT, () =>
  console.log(`Server of employees running on port ${PORT}`),
);
