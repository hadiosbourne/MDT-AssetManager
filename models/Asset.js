'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AssetSchema = new Schema(
  {
    assetName: {
      type: String,
      required: true
    },
    assetType: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  },
  {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
    collection: 'Asset'
  }
);

module.exports = mongoose.model('Asset', AssetSchema);
