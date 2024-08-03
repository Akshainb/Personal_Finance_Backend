const express = require("express");
const { authMiddleware } = require("./authMiddleware");
const { User, Money } = require("../db");
const router = express.Router();

router.get("/view", authMiddleware, async (req, res) => {
  const user = await User.find();
  res.json({ user });
});
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete({ _id: id });
  const money = await Money.find({
    userId: {
      $in: id,
    },
  });
  money.map(async (value) => {
    await Money.findByIdAndDelete({ _id: value._id });
  });
  res.json({ msg: "successfully deleted" });
});

router.get("/expense", authMiddleware, async (req, res) => {
  try {
    const moneyrecord = await Money.find().populate("userId", "email");
    res.json(moneyrecord);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.delete("/expense/delete/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const expense = await Money.findByIdAndDelete(id);
  res.json({ msg: "successfully deleted" });
});
module.exports = router;
