const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/auth-routes");
const postRoutes = require("./routes/post-routes");
const commentRoutes = require("./routes/comment-routes");

const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");

const mongoUri = "mongodb://localhost/twitter";

const db = mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("hey i'm connected");
  }
);

app.use(bodyParser.json());
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.listen(4000, function () {
  console.log("listening on port 4000!");
});
