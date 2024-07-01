const { getMyTours, addTour } = require("../Controllers/tour.controller");
const { verifyToken } = require("../Middlewares/veriftyToken");

module.exports = function (app) {
  app.get("/user/fetch", [verifyToken], getMyTours);
  app.post("/user/save/", [verifyToken], addTour);
  return app;
};
