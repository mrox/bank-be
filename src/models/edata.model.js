const mongoose = require('mongoose');

const crypto = require('crypto');

const { toJSON, paginate } = require('./plugins');

const eDataSchema = mongoose.Schema(
  {
    cccd: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    data: {
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
eDataSchema.plugin(toJSON);
eDataSchema.plugin(paginate);

eDataSchema.pre('save', async function (next) {
  const eData = this;
  eData.cccd = crypto.createHash('sha256').update(eData.cccd).digest('hex');
  next();
});

/**
 * @typedef EData
 */
const EData = mongoose.model('eData', eDataSchema);

module.exports = EData;
