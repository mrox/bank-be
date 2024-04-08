const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ERequest = require('../models/erequest.model');
const EConfig = require('../models/econfig.model');
const EData = require('../models/edata.model');
const config = require('../config/config');
const crypto = require('crypto');
const { log } = require('console');
const e = require('express');

const getERequests = catchAsync(async (req, res) => {
  const results = await ERequest.find({});
  log(results);
  res.send(results);
});

const createERequest = catchAsync(async (req, res) => {
  const from = config.site;
  var server = 'node-app-a';
  req.body.to = 'A';
  if (from == 'A') {
    req.body.to = 'B';
    var server = 'node-app-b';
  }

  const { publicKey } = req.body;
  req.body.from = from;
  req.body.status = 'new';
  // const pkey = Buffer.from(publicKey, 'base64').toString('utf-8');
  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    Buffer.from(req.body.data, 'utf-8')
  );
  req.body.data = encryptedData.toString('base64');

  // Send the data to the other server
  const axios = require('axios');

  const url = `http://${server}:3000/v1/erequest`;
  const eRequest = await ERequest.create(req.body);
  let status = 'new';
  try {
    const response = await axios.put(url, eRequest);
    log(response.data);
    status = response.data.status;
  } catch (error) {
    log(error);
    status = error.response.data.status;
    if (!error.response.data.status) status = 'error';
  }
  eRequest.status = status;
  await eRequest.save();
  // const response = await axios.put(url, req.body);
  // check status

  res.status(httpStatus.CREATED).send(eRequest);
});

const remoteERequest = catchAsync(async (req, res) => {
  // get private key from config
  const { data } = req.body;
  console.log(`edata: ${data}`);
  const eConfig = await EConfig.findOne({});
  const privateKey = eConfig.privateKey;

  const edata = Buffer.from(data, 'base64');
  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      passphrase: 'supersecret',
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    edata
  );
  const deData = JSON.parse(decryptedData.toString('utf-8'));
  log(`Decrypted data: ${deData}`);
  if (deData.cccd) {
    const rs = await EData.findOne({ cccd: deData.cccd });
    if (rs) {
      return res.status(httpStatus.OK).send({ status: 'success' });
    } else {
      return res.status(httpStatus.BAD_REQUEST).send({ status: 'cccd_notfound' });
    }
  } else {
    return res.status(httpStatus.BAD_REQUEST).send({ status: 'bad_request' });
  }
});

const createEConfig = catchAsync(async (req, res) => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'supersecret',
    },
  });
  // delete existing config
  await EConfig.deleteMany({});
  const eConfig = await EConfig.create({ publicKey, privateKey });
  res.status(httpStatus.CREATED).send(eConfig);
});

const getEConfig = catchAsync(async (req, res) => {
  const eConfig = await EConfig.findOne({});
  res.send(eConfig);
});
module.exports = {
  getERequests,
  createERequest,
  remoteERequest,
  createEConfig,
  getEConfig,
};
