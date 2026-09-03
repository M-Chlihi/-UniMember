const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

const startDatabase = async () => {
  if (mongoose.connection.readyState === 1) return;

  mongoServer = await MongoMemoryServer.create({
    binary: {
      version: process.env.MONGOMS_VERSION || "8.0.12",
      checkMD5: false,
    },
  });

  await mongoose.connect(mongoServer.getUri(), {
    dbName: "unimember_test",
  });
};

const stopDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  if (mongoServer) {
    await mongoServer.stop();
    mongoServer = undefined;
  }
};

const clearDatabase = async () => {
  if (mongoose.connection.readyState !== 1) return;

  const collections = Object.values(mongoose.connection.collections);
  await Promise.all(
    collections.map((collection) => collection.deleteMany({})),
  );
};

module.exports = {
  startDatabase,
  stopDatabase,
  clearDatabase,
};
