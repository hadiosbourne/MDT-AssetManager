'use strict';
const {Asset} = require('../models');
const _ = require('lodash');

/**
 * Create an instance of the list Service
 */
class AssetManagerService {

  constructor() {}

  /**
   * Creates a list record, prevents duplicate records where a list with the same type and title exists
   *
   * @param {object} assest - The request arguments passed in from the controller
   *
   * @return {object} created asset record
   */
  async createAsset(asset) {
    return await _saveAssetRecord(asset);
  }

  /**
   * retrieves a list
   *
   * @param {object} req - The request arguments passed in from the controller
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   *
   * @return void
   */
  async getAssets(sortParam, sortOrder) {
    let aggregationArray = [    
      {'$sort': {[sortParam]: sortOrder}}
    ];
    return await Asset.aggregate(aggregationArray).exec();
  }

  /**
   * gets an existing list
   *
   * @param {object} req - The request arguments passed in from the controller
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   *
   * @return void
   */
  async getAsset(assetId) {
    return await _findOneAssetRecord({'_id': assetId});
  }

  /**
   * updates an existing list
   *
   * @param {String} assetId - The id of the asset record to update
   * @param {Object} asset - The update object
   *
   * @return void
   */
  async updateAsset(assetId, asset) {
    const assetRecord = await _findOneAssetRecord({'_id': assetId});
    if(_.isEmpty(assetRecord)) {
      return null;
    }
    _.forEach(asset, (value, key) => {
      assetRecord[key] = value;
    });
    return await assetRecord.save();
  }

  /**
   * removes a list record
   *
   * @param {object} req - The request arguments passed in from the controller
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   *
   * @return void
   */
  async deleteAsset(assetId) {
    const res = await Asset.remove({'_id': assetId});
    return {
      deletedCount: res.deletedCount
    }
  }
}

module.exports = AssetManagerService;

/**
 * Get the list record from database
 *
 * @param {object} query - The query to match
 *
 * @private
 *
 * @return void
 */
async function _findOneAssetRecord(query) {
  return await Asset.findOne(query);
}

/**
 * saves an asset record
 *
 * @param {object} asset - The list object to save
 *
 * @private
 *
 * @return void
 */
async function _saveAssetRecord(asset) {
  const newAsset = new Asset(asset);
  return await newAsset.save(); 
}