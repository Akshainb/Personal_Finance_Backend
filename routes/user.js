const { JWT_SECRET } = require("../config");
const { User } = require("../db");

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const zod = require("zod");
const signupSchema = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});
const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  try {
    const success = signupSchema.safeParse(body);
    if (!success) {
      res.status(411).json({ msg: "Wrong inputs" });
      return;
    }
    const existingUser = await User.findOne({
      email: body.email,
    });
    if (existingUser) {
      return res.json({ msg: "Email already taken" });
    }
    const user = await User.create({
      username: body.username,
      email: body.email,
      password: body.password,
    });
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({
      msg: "User created successfully",
      token: token,
    });
  } catch (e) {
    console.log(e);
    return;
  }
});

router.post("/login", async (req, res) => {
  const success = loginSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ msg: "Wrong inputs" });
  }
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({ token: token });
    return;
  }
  res.status(411).json({
    msg: "Wrong password/email",
  });
});

module.exports = router;
