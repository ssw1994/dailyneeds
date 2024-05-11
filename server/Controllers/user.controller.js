const { ProfileModel } = require("../Models/profile.model");
const { ERRORS } = require("../Constants/app.constant");
const { AddressModel } = require("../Models/address.model");
const {
  default: mongoose,
  Types: { ObjectId },
} = require("mongoose");
const { UserModel } = require("../Models/auth.model");
exports.saveUserProfile = async function (req, res, next) {
  try {
    const data = await ProfileModel.updateOne({ _id: req.profile }, req.body);
    if (data) {
      res.status(201).send({
        message: ERRORS.PROFILE_SAVED_SUCCESSFULLY,
        data,
      });
    } else {
      res.status(500).send({
        message: ERROR_IN_SAVING_PROFILE,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: ERROR_IN_SAVING_PROFILE,
      error,
    });
  } finally {
    return;
  }
};

exports.saveUserAddress = async function (req, res, next) {
  try {
    let SavedAddress;
    if (!req?.body?._id) {
      const Address = new AddressModel({ ...req.body, profileId: req.profile });
      SavedAddress = await Address.save();
    } else {
      SavedAddress = await AddressModel.findOneAndUpdate(
        { _id: req?.body?._id },
        { ...req.body }
      );
    }
    if (SavedAddress) {
      res.status(201).send({
        message: ERRORS.ADDRESS_ADDED_SUCCESSFULLY,
        data: SavedAddress,
      });
    } else {
      res.status(500).send({
        message: ERRORS.ERROR_IN_ADDING_ADDRESS,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: ERRORS.ERROR_IN_ADDING_ADDRESS,
      error,
    });
  } finally {
    return;
  }
};

exports.fetchUserProfile = async function (req, res, next) {
  try {
    const data = await ProfileModel.aggregate([
      {
        $match: { _id: new ObjectId(req.profile) },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "address",
          foreignField: "_id",
          as: "address",
        },
      },
    ]);
    if (data && data.length > 0) {
      res.status(200).send({
        data: data[0],
        message: ERRORS.PROFILE_FETCHED_SUCCESSFULLY,
      });
    } else {
      res.status(500).send({
        message: ERRORS.ERROR_IN_LOADING_USER_PROFILE,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: ERRORS.ERROR_IN_LOADING_USER_PROFILE,
      error,
    });
  } finally {
    return;
  }
};

exports.deleteAddress = async function (req, res, next) {
  try {
    const { id } = req.query;

    const data = await AddressModel.deleteOne({ _id: id });
    if (data) {
      console.log(data?.deletedCount);
      if (data?.deletedCount > 0) {
        await ProfileModel.updateOne(
          { _id: req.profile },
          {
            $pull: { address: id },
          }
        );
      }
      res.status(200).send({
        message: ERRORS.ADDRESS_DELETED_SUCCESSFULLY,
        data,
      });
    } else {
      res.status(500).send({
        message: ERRORS.ERROR_IN_DELETING_ADDRESS,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: ERRORS.ERROR_IN_DELETING_ADDRESS,
      error,
    });
  }
};

exports.changePassword = async function (req, res, next) {
  try {
    const { oldPassword, newPassword } = req.body;
    const isPasswordMatched = await UserModel.find({
      _id: req.userId,
      password: oldPassword,
    });
    if (isPasswordMatched) {
      const data = await UserModel.findByIdAndUpdate(req.userId, {
        $set: {
          password: newPassword,
        },
      });
      if (data) {
        res.status(201).send({
          message: ERRORS.PASSWORD_CHANGED_SUCCESSFULLY,
          data,
        });
      } else {
        res.status(201).send({
          message: ERRORS.ERROR_IN_PASSWORD_CHANGE,
          data,
        });
      }
    } else {
      res.send({
        message: ERRORS.OLD_PASSWORD_DOES_NOT_MATCH,
      });
    }
  } catch (error) {
  } finally {
    return;
  }
};
