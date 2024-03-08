const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");
const { config } = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { isAuthenticated } = require("./middleware/auth");
const { errorMiddleware } = require("./middleware/error");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(errorMiddleware);

config({
  path: "./config.env",
});

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/tasks", isAuthenticated, taskRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("Error:", error));

app.listen(process.env.PORT, () =>
  console.log(
    `Server started at port number:${process.env.PORT} in ${process.env.NODE_ENV} mode`
  )
);
