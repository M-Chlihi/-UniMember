const request = require("supertest");
const app = require("../../../app");
const User = require("../../../models/User");
const Poll = require("../../../models/Poll");
const PollOption = require("../../../models/PollOption");
const Vote = require("../../../models/Vote");
const ROLES = require("../../../config/roles_list");
const {
  startDatabase,
  stopDatabase,
  clearDatabase,
} = require("../../setup/testDatabase");
const { users } = require("../../helpers/users");
const { register, login, createAgent } = require("../../helpers/auth");

describe("Poll and voting integration", () => {
  let adminToken;
  let userToken;
  let userId;

  beforeAll(() => startDatabase());
  beforeEach(async () => {
    await clearDatabase();
    const agent = createAgent();
    await register(agent, users.admin);
    await register(agent, users.user);
    await User.updateOne(
      { email: users.admin.email },
      { $set: { "roles.Admin": ROLES.Admin } },
    );
    adminToken = (await login(createAgent(), users.admin)).body.accessToken;
    const userLogin = await login(createAgent(), users.user);
    userToken = userLogin.body.accessToken;
    userId = (await User.findOne({ email: users.user.email }))._id;
  });
  afterAll(() => stopDatabase());

  const makePollPayload = () => ({
    title: "Campus Election",
    description: "Choose the student representative",
    startsAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    endsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  });

  test("admin can create a draft poll and add options", async () => {
    const createResponse = await request(app)
      .post("/api/v1/polls")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(makePollPayload());

    expect(createResponse.status).toBe(201);
    const pollId = createResponse.body.data.id;

    const first = await request(app)
      .post(`/api/v1/polls/${pollId}/options`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ title: "Candidate A" });
    const second = await request(app)
      .post(`/api/v1/polls/${pollId}/options`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ title: "Candidate B" });

    expect(first.status).toBe(201);
    expect(second.status).toBe(201);
  });

  test("publish requires the configured 3-to-4 option rule", async () => {
    const poll = await Poll.create({ ...makePollPayload(), createdBy: userId });
    await PollOption.create({ pollId: poll._id, title: "A" });
    await PollOption.create({ pollId: poll._id, title: "B" });

    const rejected = await request(app)
      .post(`/api/v1/polls/${poll._id}/publish`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(rejected.status).toBe(409);

    await PollOption.create({ pollId: poll._id, title: "C" });
    const published = await request(app)
      .post(`/api/v1/polls/${poll._id}/publish`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(published.status).toBe(200);
    expect(published.body.data.status).toBe("SCHEDULED");
  });

  test("active/open poll endpoints require authentication", async () => {
    expect((await request(app).get("/api/v1/polls/active")).status).toBe(401);
    expect((await request(app).get("/api/v1/polls/open")).status).toBe(401);
  });

  test("user can vote once and cannot vote twice", async () => {
    const poll = await Poll.create({
      ...makePollPayload(),
      status: "OPEN",
      createdBy: userId,
    });
    const optionA = await PollOption.create({ pollId: poll._id, title: "A" });
    const optionB = await PollOption.create({ pollId: poll._id, title: "B" });

    const first = await request(app)
      .post(`/api/v1/polls/${poll._id}/votes`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ optionId: optionA._id });

    expect(first.status).toBe(201);
    expect(await Vote.countDocuments({ pollId: poll._id, userId })).toBe(1);

    const second = await request(app)
      .post(`/api/v1/polls/${poll._id}/votes`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ optionId: optionB._id });

    expect(second.status).toBe(409);
  });

  test("user cannot vote with an option from another poll", async () => {
    const pollA = await Poll.create({ ...makePollPayload(), status: "OPEN", createdBy: userId });
    const pollB = await Poll.create({ ...makePollPayload(), status: "OPEN", createdBy: userId });
    const foreignOption = await PollOption.create({ pollId: pollB._id, title: "Foreign" });

    const response = await request(app)
      .post(`/api/v1/polls/${pollA._id}/votes`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ optionId: foreignOption._id });

    expect(response.status).toBe(400);
  });

  test("voting is rejected for a closed poll", async () => {
    const poll = await Poll.create({ ...makePollPayload(), status: "CLOSED", createdBy: userId });
    const option = await PollOption.create({ pollId: poll._id, title: "Closed option" });

    const response = await request(app)
      .post(`/api/v1/polls/${poll._id}/votes`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ optionId: option._id });

    expect(response.status).toBe(409);
  });

  test("my-vote and voting history reflect a submitted vote", async () => {
    const poll = await Poll.create({ ...makePollPayload(), status: "OPEN", createdBy: userId });
    const option = await PollOption.create({ pollId: poll._id, title: "Candidate" });
    await Vote.create({ pollId: poll._id, optionId: option._id, userId });

    const myVote = await request(app)
      .get(`/api/v1/polls/${poll._id}/my-vote`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(myVote.status).toBe(200);
    expect(myVote.body.vote.optionTitle).toBe("Candidate");

    const history = await request(app)
      .get("/api/v1/polls/history")
      .set("Authorization", `Bearer ${userToken}`);

    expect(history.status).toBe(200);
    expect(history.body.data).toHaveLength(1);
    expect(history.body.data[0].myVote.optionTitle).toBe("Candidate");
  });
});
