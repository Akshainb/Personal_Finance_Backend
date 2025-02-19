const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/pfm", rootRouter);
app.listen(3000);
