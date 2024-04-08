const mongoose = require('mongoose');
const crypto = require('crypto');

const { toJSON, paginate } = require('./plugins');

const eRequestSchema = mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
      trim: true,
    },
    from: {
      type: String,
      required: true,
      trim: true,
    },
    data: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
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
eRequestSchema.plugin(toJSON);
eRequestSchema.plugin(paginate);
// eRequestSchema.pre('save', async function (next) {
//   const eData = this;
//   eData.data = crypto.createHash('sha256').update(eData.cccd).digest('hex');
//   next();
// });

/**
 * @typedef ERequest
 */
const ERequest = mongoose.model('eRequest', eRequestSchema);

module.exports = ERequest;
