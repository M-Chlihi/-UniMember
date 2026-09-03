const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../../models/User");
const app = require("../../../app");
const {
  startDatabase,
  stopDatabase,
  clearDatabase,
} = require("../../setup/testDatabase");
const {
  createAgent,
  register,
  login,
  extractAccessToken,
} = require("../../helpers/auth");

process.env.ACCESS_TOKEN_SECRET ||= "test-access-secret";
process.env.REFRESH_TOKEN_SECRET ||= "test-refresh-secret";
process.env.ACCESS_TOKEN_EXPIRES_IN ||= "15m";
process.env.REFRESH_TOKEN_EXPIRES_IN ||= "1d";

describe("Authentication integration", () => {
  beforeAll(() => startDatabase());
  beforeEach(() => clearDatabase());
  afterAll(() => stopDatabase());

  const testUser = {
    username: "AuthUser",
    email: "auth@example.com",
    password: "StrongPassword123!",
  };

  test("registers and logs in a user", async () => {
    const agent = createAgent();

    const registerResponse = await register(agent, testUser);
    expect(registerResponse.status).toBe(201);

    const loginResponse = await login(agent, testUser);
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.accessToken).toEqual(expect.any(String));
    expect(loginResponse.body.user).toMatchObject({
      username: testUser.username,
      email: testUser.email,
      roles: ["User"],
    });
    expect(loginResponse.body.user.password).toBeUndefined();
    expect(loginResponse.headers["set-cookie"]).toEqual(
      expect.arrayContaining([expect.stringContaining("jwt=")]),
    );
  });

  test("persists only a password hash and the refresh token", async () => {
    const agent = createAgent();
    await register(agent, testUser);
    const loginResponse = await login(agent, testUser);

    const savedUser = await User.findOne({ email: testUser.email })
      .select("+password +refreshToken")
      .lean();

    expect(savedUser.password).toEqual(expect.any(String));
    expect(savedUser.password).not.toBe(testUser.password);
    expect(savedUser.refreshToken).toBe(loginResponse.headers["set-cookie"][0].match(/jwt=([^;]+)/)[1]);
  });

  test("protects an authenticated endpoint with the access token", async () => {
    const agent = createAgent();
    await register(agent, testUser);
    const loginResponse = await login(agent, testUser);
    const token = extractAccessToken(loginResponse);

    const response = await agent
      .get("/api/v1/polls/open")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  test("returns 401 when the access token is missing", async () => {
    const response = await createAgent().get("/api/v1/polls/open");
    expect(response.status).toBe(401);
  });

  test("returns 403 when the access token is invalid", async () => {
    const response = await createAgent()
      .get("/api/v1/polls/open")
      .set("Authorization", "Bearer definitely-invalid-token");

    expect(response.status).toBe(403);
  });

  test("refreshes the access token from the httpOnly refresh cookie", async () => {
    const agent = createAgent();
    await register(agent, testUser);
    await login(agent, testUser);

    const response = await agent.post("/api/v1/auth/refresh");

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toEqual(expect.any(String));
    expect(response.body.user.roles).toEqual(["User"]);
  });

  test("returns 401 when refresh cookie is missing", async () => {
    const response = await createAgent().post("/api/v1/auth/refresh");
    expect(response.status).toBe(401);
  });

  test("logout invalidates the refresh token", async () => {
    const agent = createAgent();
    await register(agent, testUser);
    await login(agent, testUser);

    const logoutResponse = await agent.post("/api/v1/auth/logout");
    expect(logoutResponse.status).toBe(204);

    const savedUser = await User.findOne({ email: testUser.email });
    expect(savedUser.refreshToken).toBe("");

    const refreshResponse = await agent.post("/api/v1/auth/refresh");
    expect(refreshResponse.status).toBe(403);
  });

  test("rejects a tampered refresh token", async () => {
    const agent = createAgent();
    await register(agent, testUser);
    await login(agent, testUser);

    const savedUser = await User.findOne({ email: testUser.email });
    const token = jwt.sign(
      { email: testUser.email },
      "different-secret",
      { expiresIn: "1d" },
    );
    savedUser.refreshToken = token;
    await savedUser.save();

    const response = await require("supertest")(app)
      .post("/api/v1/auth/refresh")
      .set("Cookie", `jwt=${token}`);

    expect(response.status).toBe(403);
  });
});
