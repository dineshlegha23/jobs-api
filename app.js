const connectDB = require("./config/db");
require("dotenv").config();
require("express-async-errors");

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();
const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");
const authMiddleware = require("./middleware/authentication");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/v1/jobs", authMiddleware, jobsRouter);
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_USERNAME, process.env.MONGODB_PASSWORD);

    app.listen(port, () => {
      console.log("Server is running on port:3000");
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
