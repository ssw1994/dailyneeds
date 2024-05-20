const {
  saveUserProfile,
  saveUserAddress,
  fetchUserProfile,
  deleteAddress,
  changePassword,
} = require("../Controllers/user.controller");
const { verifyToken } = require("../Middlewares/veriftyToken");

module.exports = function (app) {
  app.post("/profile", [verifyToken], saveUserProfile);
  app.get("/profile", [verifyToken], fetchUserProfile);
  app.post("/address", [verifyToken], saveUserAddress);
  app.delete("/address", [verifyToken], deleteAddress);
  app.post("/changepassword", [verifyToken], changePassword);
  return app;
};
