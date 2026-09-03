const request = require("supertest");
const app = require("../../../app");
const User = require("../../../models/User");
const ROLES = require("../../../config/roles_list");
const {
  startDatabase,
  stopDatabase,
  clearDatabase,
} = require("../../setup/testDatabase");
const { users } = require("../../helpers/users");
const { register, login, createAgent } = require("../../helpers/auth");

describe("Authorization and RBAC integration", () => {
  beforeAll(() => startDatabase());
  beforeEach(async () => {
    await clearDatabase();

    const agent = createAgent();
    await register(agent, users.admin);
    await register(agent, users.editor);
    await register(agent, users.user);

    await User.updateOne(
      { email: users.admin.email },
      { $set: { "roles.Admin": ROLES.Admin } },
    );
    await User.updateOne(
      { email: users.editor.email },
      { $set: { "roles.Editor": ROLES.Editor } },
    );
  });
  afterAll(() => stopDatabase());

  const tokenFor = async (user) => {
    const response = await login(createAgent(), user);
    expect(response.status).toBe(200);
    return response.body.accessToken;
  };

  test("only admins can list users", async () => {
    const adminToken = await tokenFor(users.admin);
    const editorToken = await tokenFor(users.editor);
    const userToken = await tokenFor(users.user);

    expect(
      (await request(app).get("/api/v1/users").set("Authorization", `Bearer ${adminToken}`)).status,
    ).toBe(200);
    expect(
      (await request(app).get("/api/v1/users").set("Authorization", `Bearer ${editorToken}`)).status,
    ).toBe(403);
    expect(
      (await request(app).get("/api/v1/users").set("Authorization", `Bearer ${userToken}`)).status,
    ).toBe(403);
  });

  test("admin can update another user's roles but editor cannot", async () => {
    const adminToken = await tokenFor(users.admin);
    const editorToken = await tokenFor(users.editor);
    const target = await User.findOne({ email: users.user.email });

    const adminResponse = await request(app)
      .patch(`/api/v1/users/${target._id}/roles`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ roles: { User: ROLES.User, Editor: ROLES.Editor } });

    expect(adminResponse.status).toBe(200);
    expect(adminResponse.body.data.roles).toEqual(
      expect.arrayContaining(["User", "Editor"]),
    );

    const editorResponse = await request(app)
      .patch(`/api/v1/users/${target._id}/roles`)
      .set("Authorization", `Bearer ${editorToken}`)
      .send({ roles: { User: ROLES.User } });

    expect(editorResponse.status).toBe(403);
  });

  test("prevents the last administrator from removing their own admin role", async () => {
    const adminToken = await tokenFor(users.admin);
    const admin = await User.findOne({ email: users.admin.email });

    const response = await request(app)
      .patch(`/api/v1/users/${admin._id}/roles`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ roles: { User: ROLES.User } });

    expect(response.status).toBe(409);
    expect(response.body.message).toMatch(/last administrator/i);
  });

  test("poll management is available to editor/admin but not regular users", async () => {
    const adminToken = await tokenFor(users.admin);
    const editorToken = await tokenFor(users.editor);
    const userToken = await tokenFor(users.user);

    const payload = {
      title: "Authorization Poll",
      description: "RBAC integration test",
      startsAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      endsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    };

    expect(
      (await request(app).post("/api/v1/polls").set("Authorization", `Bearer ${adminToken}`).send(payload)).status,
    ).toBe(201);
    expect(
      (await request(app).post("/api/v1/polls").set("Authorization", `Bearer ${editorToken}`).send(payload)).status,
    ).toBe(201);
    expect(
      (await request(app).post("/api/v1/polls").set("Authorization", `Bearer ${userToken}`).send(payload)).status,
    ).toBe(403);
  });
});
