const { ERRORS } = require("../Constants/app.constant");
const { UserModel } = require("../Models/auth.model");

exports.verifySignUp = function (req, res, next) {
  try {
    UserModel.findOne({
      username: req.body.username,
    })
      .exec()
      .then((doc) => {
        if (doc) {
          res.status(400).send({
            message: ERRORS.USER_ALREADY_EXIST,
          });
        }
        next();
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({
          message: ERRORS.SOMETHING_WENT_WRONG,
          error,
        });
        return;
      });
  } catch (error) {}
};
