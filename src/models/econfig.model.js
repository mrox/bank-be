const mongoose = require('mongoose');

const crypto = require('crypto');

const { toJSON, paginate } = require('./plugins');

const eConfigSchema = mongoose.Schema(
  {
    publicKey: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    privateKey: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
eConfigSchema.plugin(toJSON);

/**
 * @typedef EData
 */
const EConfig = mongoose.model('eConfig', eConfigSchema);

module.exports = EConfig;
