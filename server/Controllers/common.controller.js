const { ERRORS } = require("../Constants/app.constant");
const { TagModel } = require("../Models/tag.model");

exports.addTags = async function (req, res, nex) {
  try {
    const data = await TagModel.insertMany(req.body);
    if (data) {
      res.status(201).send({
        data,
        message: ERRORS.TAG_SAVED_SUCCESSFULLY,
      });
      return;
    } else {
      res.status(500).send({
        message: ERRORS.ERROR_IN_SAVING_TAGS,
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
      message: ERRORS.ERROR_IN_SAVING_TAGS,
    });
    return;
  }
};

exports.fetchTags = async function (req, res, next) {
  try {
    const data = await TagModel.find();
    if (data) {
      res.status(200).send({ data, message: ERRORS.TAGS_FETCHED_SUCCESSFULLY });
    } else {
      res.status(500).send({ message: ERRORS.ERROR_IN_FETCHING_TAGS });
    }
    return;
  } catch (error) {
    res.status(500).send({ error, message: ERRORS.ERROR_IN_FETCHING_TAGS });
    return;
  }
};

exports.removeTags = async function (req, res, next) {
  try {
    const id = req.query["id"];
    const data = await TagModel.findByIdAndDelete(id);
    if (data) {
      res.status(200).send({
        data,
        message: ERRORS.TAG_REMOVED_SUCCESSFULLY,
      });
    } else {
      res.status(500).send({
        message: ERRORS.ERROR_IN_REMOVE_TAGS,
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
      message: ERRORS.ERROR_IN_REMOVE_TAGS,
    });
  } finally {
    return;
  }
};
