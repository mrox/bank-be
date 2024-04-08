const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ERequest = require('../models/erequest.model');
const config = require('../config/config');
const crypto = require('crypto');

const getERequests = catchAsync(async (req, res) => {
  const results = await ERequest.find({});
  res.send(results);
});

const createERequest = catchAsync(async (req, res) => {
  const from = config.site;
  const { publicKey } = req.body;
  req.body.from = from;
  req.body.status = 'new';
  const pkey = Buffer.from(publicKey, 'base64').toString('utf-8');
  const encryptedData = crypto.publicEncrypt(
    {
      key: pkey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(req.body.data, 'utf-8')
  );
  req.body.data = encryptedData.toString('base64');
  const eRequest = await ERequest.create(req.body);
  res.status(httpStatus.CREATED).send(eRequest);
});

module.exports = {
  getERequests,
  createERequest,
};
