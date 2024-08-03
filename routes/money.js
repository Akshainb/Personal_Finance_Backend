const express = require("express");
const { authMiddleware } = require("./authMiddleware");
const { Money } = require("../db");
const { route } = require("./user");
const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const finance = await Money.create({
    userId,
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description,
    date: req.body.date,
  });
  res.json({
    msg: "Finance added",
  });
});

router.get("/view", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const finance = await Money.find({
    userId: userId,
  });
  res.json({ finance });
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  await Money.findByIdAndDelete(id);
  res.json({
    msg: "successfully deletd",
  });
});
router.put("/update", authMiddleware, async (req, res) => {
  const id = req.body.id;
  await Money.updateOne({ _id: id }, req.body);
  res.json({
    msg: "success update",
  });
});
module.exports = router;
