const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { isValid } = require("./validation.js");
const { jwtSecret } = require("./secrets.js");

const Users = require("../models/auth-models.js");

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcrypt.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide email and password",
    });
  }
});

router.post("/login", (req, res) => {
  // implement login

  const { email, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ email })
      .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = makeToken(user);
          const id = user.id;

          res.status(200).json({ message: "welcome to co-make", token, id });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide username and password. Password should be alphanumeric",
    });
  }
});

function makeToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: "1 day",
  };

  return jwt.sign(payload, jwtSecret, options);
}
module.exports = router;
