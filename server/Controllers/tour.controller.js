const { ERRORS } = require("../Constants/app.constant");
const { TourModel, DayPlanModel } = require("../Models/tour.model");
const {
  Types: { ObjectId },
} = require("mongoose");
exports.getMyTours = async function (req, res, next) {
  try {
    const id = req.query["_id"];
    console.log(id);
    let matchObj = {
      userId: new ObjectId(req.userId),
    };
    if (id) {
      matchObj["_id"] = new ObjectId(id);
    }
    const data = await TourModel.aggregate([
      { $match: matchObj },
      {
        $lookup: {
          foreignField: "_id",
          localField: "dayPlans",
          from: "dayplans",
          as: "dayPlans",
        },
      },
    ]);
    if (data) {
      res.status(200).send({
        data: id ? data[0] : data,
        message: ERRORS.TOUR_FETCHED_SUCCESSFULLY,
      });
    } else {
      res.status(500).send({
        message: ERRORS.ERROR_IN_FETCHING_TOURS,
      });
    }
  } catch (error) {
    res.status(500).ssend({
      error,
      message: ERRORS.ERROR_IN_FETCHING_TOURS,
    });
  } finally {
    return;
  }
};

exports.addTour = async function (req, res, next) {
  try {
    let { name, fromDate, toDate, dayPlans } = req.body;
    const tourPayload = {
      name,
      fromDate,
      toDate,
      userId: req.userId,
    };

    const Tour = new TourModel(tourPayload);

    const data = await Tour.save();
    dayPlans = dayPlans.map((item) => {
      return {
        ...item,
        userId: req.userId,
        tourId: data._id,
      };
    });
    const savedDayPlans = await DayPlanModel.insertMany(dayPlans);
    const _ids = savedDayPlans.map((plan) => plan._id);

    await TourModel.findByIdAndUpdate(data._id, { $set: { dayPlans: _ids } });
    if (data) {
      res.status(201).send({
        data,
        message: ERRORS.TOUR_SAVED_SUCCESSFULLY,
      });
    } else {
      res.status(201).send({
        message: ERRORS.ERROR_IN_SAVING_TOUR,
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
      message: ERRORS.ERROR_IN_SAVING_TOUR,
    });
  } finally {
    return;
  }
};
