const request = require("supertest");
const app = require("../../../app");
const User = require("../../../models/User");
const Poll = require("../../../models/Poll");
const Notification = require("../../../models/Notification");
const ROLES = require("../../../config/roles_list");
const {
  startDatabase,
  stopDatabase,
  clearDatabase,
} = require("../../setup/testDatabase");
const { users } = require("../../helpers/users");
const { register, login, createAgent } = require("../../helpers/auth");

describe("Notification administration integration", () => {
  let adminToken;
  let editorToken;
  let userToken;
  let pollId;

  beforeAll(() => startDatabase());
  beforeEach(async () => {
    await clearDatabase();
    const agent = createAgent();
    await register(agent, users.admin);
    await register(agent, users.editor);
    await register(agent, users.user);
    await User.updateOne({ email: users.admin.email }, { $set: { "roles.Admin": ROLES.Admin } });
    await User.updateOne({ email: users.editor.email }, { $set: { "roles.Editor": ROLES.Editor } });

    adminToken = (await login(createAgent(), users.admin)).body.accessToken;
    editorToken = (await login(createAgent(), users.editor)).body.accessToken;
    userToken = (await login(createAgent(), users.user)).body.accessToken;

    const poll = await Poll.create({
      title: "Notification Poll",
      startsAt: new Date(Date.now() + 60 * 60 * 1000),
      endsAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
      status: "CLOSED",
      createdBy: (await User.findOne({ email: users.admin.email }))._id,
    });
    pollId = poll._id;

    const recipients = await User.find({}).select("_id").lean();
    await Notification.insertMany(
      recipients.map((recipient, index) => ({
        pollId,
        recipientId: recipient._id,
        type: "POLL_RESULT",
        channel: "EMAIL",
        status: index === 0 ? "SENT" : "FAILED",
        attempts: index === 0 ? 1 : 2,
        sentAt: index === 0 ? new Date() : null,
      })),
    );
  });
  afterAll(() => stopDatabase());

  test("admin can list notifications and summary", async () => {
    const listResponse = await request(app)
      .get("/api/v1/notifications")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.data).toHaveLength(3);

    const summaryResponse = await request(app)
      .get(`/api/v1/notifications/summary?pollId=${pollId}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(summaryResponse.status).toBe(200);
    expect(summaryResponse.body.data.total).toBe(3);
    expect(summaryResponse.body.data.sent).toBe(1);
    expect(summaryResponse.body.data.failed).toBe(2);
  });

  test("editor can list notifications but cannot access admin history/summary", async () => {
    expect(
      (await request(app)
        .get("/api/v1/notifications")
        .set("Authorization", `Bearer ${editorToken}`)).status,
    ).toBe(200);

    expect(
      (await request(app)
        .get("/api/v1/notifications/history")
        .set("Authorization", `Bearer ${editorToken}`)).status,
    ).toBe(403);

    expect(
      (await request(app)
        .get("/api/v1/notifications/summary")
        .set("Authorization", `Bearer ${editorToken}`)).status,
    ).toBe(403);
  });

  test("regular users cannot access notification administration", async () => {
    expect(
      (await request(app)
        .get("/api/v1/notifications")
        .set("Authorization", `Bearer ${userToken}`)).status,
    ).toBe(403);
  });
});
