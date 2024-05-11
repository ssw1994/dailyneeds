const { verifyToken } = require("../Middlewares/veriftyToken");
const { addTrade, fetchTrades } = require("../Controllers/trade.controller");
module.exports = function (app) {
  app.post("/fetch", [verifyToken], fetchTrades);
  app.post("/add", [verifyToken], addTrade);
  return app;
};
