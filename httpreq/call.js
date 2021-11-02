const httpReq = require("./HTTP-requests");

const funcTimer = () => {
  httpReq();
  setInterval(() => {
    httpReq();
  }, 3600000);
};

module.exports = funcTimer;
