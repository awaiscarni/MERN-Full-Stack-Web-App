const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/authMiddleware");
const { where } = require("sequelize");

//valideToken for web
router.post("/", (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) res.json({ error: "No User Found" });
  else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({ error: "Wrong username or password" });
      else {
        const accessToken = sign(
          { username: user.username, id: user.id },
          "importantSecret"
        );
        res.json({ token: accessToken, username: username, id: user.id });
      }
    });
  }
});

router.get("/check", (req, res) => {
  res.json(req.user);
});

router.get("/userinfo/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(user);
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then((match) => {
    if (!match) {
      res.json({ error: "Wrong password entered" });
    } else {
      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update(
          { password: hash },
          { where: { username: req.user.username } }
        );
        res.json("success");
      });
    }
  });
});

module.exports = router;
