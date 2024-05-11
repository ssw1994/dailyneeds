const {
  registerUser,
  signIn,
  verifyEmail,
  fetchUserDetails,
} = require("../Controllers/auth.controller");
const { verifyToken } = require("../Middlewares/veriftyToken");
const { verifySignUp } = require("../Middlewares/verifySign");

module.exports = function (app) {
  app.post("/signUp", [verifySignUp], registerUser);
  app.post("/signIn", signIn);
  app.get("/email/verify", verifyEmail);
  app.get("/details", [verifyToken], fetchUserDetails);
  return app;
};
