const Posts = require("./post-models");
const db = require("../database/db-config");

beforeEach(async () => {
  await db("posts").truncate();
});

describe("posts models", () => {
  describe("getAll", () => {
    it("gets empty array", async () => {
      const users = await Posts.getAll();
      expect(users).toHaveLength(0);
    });

    it("gets all issues", async () => {
      await db("posts").insert({ post: "clean room", user_id: 1 });
      let issues = await Posts.getAll();
      expect(issues).toHaveLength(1);

      await db("posts").insert({ post: "clean kitchen", user_id: 2 });
      issues = await Posts.getAll();
      expect(issues).toHaveLength(2);
    });
  });

  describe("addPosts()", () => {
    it("can insert new issues", async () => {
      await Posts.addPost({ post: "clean kitchen", user_id: 2 });
      let issues = await db("posts");
      expect(issues).toHaveLength(1);

      await Posts.addPost({ post: "fix the toilet", user_id: 2 });
      issues = await db("posts");
      expect(issues).toHaveLength(2);
    });
  });

  describe("update()", () => {
    it("can update issues", async () => {
      await db("posts").insert({ post: "fix the shower", user_id: 2 });

      let issue = await Posts.update(1, { post: "fix the toilet", user_id: 2 });

      expect(issue).toMatchObject({
        id: 1,
        post: "fix the toilet",
        user_id: 2,
      });

      issue = await db("posts").where({ id: 1 }).first();
      expect(issue.post).toBe("fix the toilet");
    });
  });

  describe("remove method", () => {
    it("can delete a post", async () => {
      await db("posts").insert({ post: "fix the shower", user_id: 2 });
      await Posts.remove(1);
      let deletedItem = await db("posts");

      expect(deletedItem).toHaveLength(0);
    });
  });
});
