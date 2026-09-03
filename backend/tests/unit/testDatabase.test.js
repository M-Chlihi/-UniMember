const mongoose = require("mongoose");
const { startDatabase, stopDatabase } = require("../setup/testDatabase");

describe("Test database", () => {
  beforeAll(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await stopDatabase();
  });

  test("uses an active MongoDB connection", () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});
