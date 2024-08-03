const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/finance");
const UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
});
const moneySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  amount: { type: Number },
  category: { type: String },
  date: { type: String },
  description: { type: String },
});
const User = mongoose.model("User", UserSchema);
const Money = mongoose.model("Money", moneySchema);

module.exports = {
  User,
  Money,
};
