// getting-started.js
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRoute");
const professorRouter = require("./routes/professor");
const adminRouter = require("./routes/adminRoutes");
const questionRouter = require("./routes/questionRoutes");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/professor", professorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/questions", questionRouter);

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Professor",
    })
    .then((data) => {
      console.log("MongoDB connected successfully", data.connection.name);
    });
}

module.exports = app;
