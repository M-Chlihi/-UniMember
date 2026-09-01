const app = require("./app");
const { startJobs } = require("./jobs");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;

const startServer = async () => {
  await connectDB();
  //run lifecycle job once AND start the intervall

  await startJobs();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
