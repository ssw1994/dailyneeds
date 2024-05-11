const { ERRORS, NOTIFICATION, APP } = require("../Constants/app.constant");
const { UserModel } = require("../Models/auth.model");
const jwt = require("jsonwebtoken");
const { transporter, registraionTemplate } = require("./mail.controller");
const { CartModel, WishModel } = require("../Models/cart.model");
exports.registerUser = async function (req, res, next) {
  try {
    const User = new UserModel({
      ...req.body,
    });
    User.save()
      .then((doc) => {
        const token = jwt.sign(
          {
            username: doc._id,
          },
          process.env.JWT_PASSKEY,
          { expiresIn: "1h" }
        );
        try {
          transporter.sendMail(
            {
              to: doc.username,
              from: process.env.EMAIL,
              subject: NOTIFICATION.VERIFY_EMAIL,
              text: "verify email for " + APP.NAME,
              html: registraionTemplate(doc.username),
            },
            (error) => {
              console.log(error);
            },
            (info) => {
              console.log(info);
            }
          );
        } catch (error) {
          console.error(error);
        }
        res.status(201).send({
          message: ERRORS.USER_SAVE_SUCCESS,
          token,
        });
        return;
      })
      .catch((error) => {
        res.status(500).send({ message: ERRORS.ERROR_IN_USER_SAVE, error });
        return;
      });
  } catch (error) {
    res.status(500).send({
      message: ERRORS.SOMETHING_WENT_WRONG,
    });
    return;
  } finally {
    return;
  }
};

exports.signIn = async function (req, res, next) {
  try {
    const user = await UserModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (!user) {
      res.status(401).send({
        message: ERRORS.USER_NOT_FOUND,
      });
      return;
    }

    const token = jwt.sign(
      {
        username: user._id,
      },
      process.env.JWT_PASSKEY,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      message: ERRORS.USER_LOGGED_IN_SUCCESSFULLY,
      token,
    });
    return;
  } catch (error) {
    res.status(500).send({
      message: ERRORS.SOMETHING_WENT_WRONG,
      error,
    });
    return;
  }
};

exports.verifyEmail = async function (req, res, next) {
  try {
    const params = req.params;
    const response = await UserModel.findOneAndUpdate(
      { username: params?.username },
      { $set: { isVerified: true } }
    );
    if (response) {
      res.status(200).send({
        message: "Email Verified Successfully",
      });
      return;
    }
    res.status(500).send({
      message: ERRORS.EMAIL_VERIFICAION_ERROR,
    });
    return;
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

exports.fetchUserDetails = async function (req, res, next) {
  try {
    const userDetails = await UserModel.findById(req.userId, { password: 0 });
    if (userDetails) {
      res.status(200).send({
        userDetails: userDetails,
        message: ERRORS.USER_DETAILS_FETCHED,
      });
      return;
    } else {
      res.status(500).send({
        message: ERRORS.USER_DETAILS_FAILED,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: ERRORS.SOMETHING_WENT_WRONG,
      error,
    });
  }
};
