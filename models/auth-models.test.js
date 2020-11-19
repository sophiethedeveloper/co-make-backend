const Auth = require("./auth-models");
const db = require("../database/db-config");

describe("Authorization", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("auth model, find method", () => {
    it("gets empty array", async () => {
      const users = await Auth.find();
      expect(users).toHaveLength(0);
    });
  });

  it("gets all the users", async () => {
    await db("users").insert({ email: "sofialu@gmail.com", password: "12345" });
    let users = await Auth.find();
    expect(users).toHaveLength(1);

    await db("users").insert({ email: "briank@gmail.com", password: "12345" });
    users = await Auth.find();
    expect(users).toHaveLength(2);
  });
});
