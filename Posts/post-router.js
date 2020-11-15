const router = require("express").Router();
const { get } = require("../auth/auth-router");
const Posts = require("../models/post-models");

router.get("/", (req, res) => {
  Posts.getAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
