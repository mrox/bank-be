const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const EData = require('../models/edata.model');

const getEDatas = catchAsync(async (req, res) => {
  const results = await EData.find({});

  res.send(results);
});

const createEData = catchAsync(async (req, res) => {
  const eData = await EData.create(req.body);
  res.status(httpStatus.CREATED).send(eData);
});

module.exports = {
  getEDatas,
  createEData,
};
