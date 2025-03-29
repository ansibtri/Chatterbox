const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const { connectDB } = require("./config/db");

// connectDB();
const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const cors = require("cors");
const { verifyJWT } = require("./utility/AuthJWT.utility");
const { verify } = require("crypto");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["*"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", require("./routes/auth.route"));

// verfiy JWT
// app.use();
app.use(
  "/api/users",
  (req, res, next) => {
    if (verifyJWT(req, res)) next();
    return response(res, "Forbidden", 403, {
      type: "Forbidden",
      message: "Not Login",
    });
  },
  require("./routes/users.route")
);
app.use("/api/rooms", require("./routes/rooms.route"));
app.use("/api/messages", require("./routes/message.route"));
app.use("/api/notifications", require("./routes/notifications.route"));

server.listen(5000, () => {
  console.log(`Server is listening at: 5000`);
});
