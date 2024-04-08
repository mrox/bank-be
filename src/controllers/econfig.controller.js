const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const EData = require('../models/edata.model');

const getEDatas = catchAsync(async (req, res) => {
  const results = await EData.find({});

  res.send(results);
});

const getEData = catchAsync(async (req, res) => {
  const { id } = req.params;
  const eData = await EData.findById(id);

  res.send(eData);
});

const createEData = catchAsync(async (req, res) => {
  const eData = await EData.create(req.body);
  res.status(httpStatus.CREATED).send(eData);
});

module.exports = {
  getEDatas,
  getEData,
  createEData,
};
