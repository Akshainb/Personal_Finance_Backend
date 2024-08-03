const express = require("express");
const userRouter = require("./user");
const moneyRouter = require("./money");
const adminRouter = require("./admin");
const router = express.Router();
router.use("/user", userRouter);
router.use("/money", moneyRouter);
router.use("/admin", adminRouter);
module.exports = router;
