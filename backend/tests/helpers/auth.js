const request = require("supertest");
const app = require("../../app");

const createAgent = () => request.agent(app);

const register = (agent, user) =>
  agent.post("/api/v1/auth/register").send(user);

const login = (agent, user) =>
  agent.post("/api/v1/auth/login").send({
    email: user.email,
    password: user.password,
  });

const extractAccessToken = (response) => response.body?.accessToken ?? null;

module.exports = {
  createAgent,
  register,
  login,
  extractAccessToken,
};
