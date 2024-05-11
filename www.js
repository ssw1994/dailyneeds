const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const env = require("dotenv");
const http = require("http");
const mongoose = require("mongoose");
env.config();

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
  })
  .then((response) => {
    console.log("Connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/users", require("./server/Routes/auth.route")(router));
app.use("/blogs", require("./server/Routes/blog.route")(router));
app.use("/comment", require("./server/Routes/comment.route")(router));
app.use("/trades", require("./server/Routes/trade.route")(router));
app.use("/upload", require("./server/Routes/upload.route")(router));
app.use("/common", require("./server/Routes/common.route")(router));
app.use("/store", require("./server/Routes/store.route")(router));
app.use("/user", require("./server/Routes/user.route")(router));
//app.use(express.static("build"));

app.get("/", (req, res, next) => {
  res.send("Server is running");
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
