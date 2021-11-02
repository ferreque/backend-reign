const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const funcTimer = require("../httpreq/call");
class Server {
  constructor() {
    this.app = express();
    this.usersPath = "/api/users";
    this.hackerPath = "/api/hacker";
    this.authPath = "/api/auth";
    this.conectDB();
    this.funcTimerA();
    this.middlewares();
    this.routes();
  }

  async conectDB() {
    await dbConnection();
  }

  async funcTimerA() {
    await funcTimer();
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usersPath, require("../routes/users"));
    this.app.use(this.hackerPath, require("../routes/http"));
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Server online in port", process.env.PORT);
    });
  }
}

module.exports = Server;
