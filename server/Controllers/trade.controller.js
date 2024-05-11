const { ERRORS } = require("../Constants/app.constant");
const { TradeModel } = require("../Models/trade.model");
const {
  Types: { ObjectId },
} = require("mongoose");
exports.addTrade = async function (req, res, next) {
  try {
    const Trade = new TradeModel({
      userId: req.userId,
      ...req.body,
    });

    const data = await Trade.save();

    if (data) {
      res.status(201).send({
        message: ERRORS.TRADE_ADDED_SUCCESSFULLY,
        data,
      });
    } else {
      res.status(500).send({
        message: ERRORS.ERROR_IN_ADDING_TRADE,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error,
      message: ERRORS.ERROR_IN_ADDING_TRADE,
    });
  }
};

exports.fetchTrades = async function (req, res, next) {
  try {
    const { fromDate, toDate } = req.body;
    console.log(fromDate, toDate);

    const data = await TradeModel.aggregate([
      {
        $match: {
          userId: new ObjectId(req.userId),
          dateOfTrade: {
            $gte: new Date(fromDate),
            $lte: new Date(toDate),
          },
        },
      },
      {
        $group: {
          _id: "$dateOfTrade",
          amount: { $sum: "$amount" },
          userId: { $first: "$userId" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          tradeId: { $first: "$_id" },
          dateOfTrade: { $first: "$dateOfTrade" },
        },
      },
    ]);
    if (data) {
      res.status(200).send({
        data,
        message: ERRORS.TRADES_FETCH_SUCCESSFULLY,
      });
    } else {
      res.status(500).send({
        message: ERRORS.TRADES_FETCH_SUCCESSFULLY,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      message: ERRORS.TRADES_FETCH_SUCCESSFULLY,
    });
  }
};
exports.viewTradeDetails = async function (req, res, next) {
  try {
  } catch (error) {}
};
exports.viewMonthReport = async function (req, res, next) {};

exports.viewDayReport = async function (req, res, next) {};
exports.viewWeekReport = async function (req, res, next) {};
exports.viewYearReport = async function (req, res, next) {};
