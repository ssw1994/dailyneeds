const jwt = require("jsonwebtoken");
const { ERRORS } = require("../Constants/app.constant");
const { UserModel } = require("../Models/auth.model");
exports.verifyToken = async (req, res, next) => {
  try {
    const raw_token = req.headers["x-access-token"];
    if (!raw_token) {
      res.status(401).send(new Error(ERRORS.TOKEN_NOT_FOUND));
      return;
    }
    const tokenDetails = jwt.verify(raw_token, process.env.JWT_PASSKEY);
    if (tokenDetails?.username) {
      const userDetails = await UserModel.findById(tokenDetails?.username);
      if (!userDetails) {
        res.status(401).send(new Error(ERRORS.INVALID_TOKEN));
        return;
      }

      req.userId = userDetails?._id;
      req.cartId = userDetails?.cartId;
      req.wishId = userDetails?.wishId;
      req.profile = userDetails?.profile;

      next();
    }
  } catch (error) {
    res.status(401).send(new Error(ERRORS.SOMETHING_WENT_WRONG));
    return;
  }
};
