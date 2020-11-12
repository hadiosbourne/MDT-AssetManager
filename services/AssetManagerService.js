'use strict';
const _ = require('lodash');

/**
 * Create an instance of the asset manager Service
 */
class AssetManagerService {
  constructor(assetCollection) {
    this.Asset = assetCollection;
  }

  /**
   * Creates an asset record, prevents duplicate records where an asset with the same type and name exists
   *
   * @param {object} assest - The request arguments passed in from the controller
   *
   * @return {object} created asset record
   */
  async createAsset(asset) {
    return await _saveAssetRecord(asset, this.Asset);
  }

  /**
   * retrieves a list of assets based on the query
   *
   * @param {object} req - The request arguments passed in from the controller
   *
   * @return void
   */
  async getAssets(sortParam, sortOrder, assetName = null, assetType = null) {
    let aggregationArray = [
      {'$sort': {[sortParam]: sortOrder}}
    ];
    if (!_.isNull(assetName)) {
      aggregationArray.push({'$match': {assetName}});
    }
    if (!_.isNull(assetType)) {
      aggregationArray.push({'$match': {assetType}});
    }
    return await this.Asset.aggregate(aggregationArray).exec();
  }

  /**
   * gets an existing asset record
   *
   * @param {object} req - The request arguments passed in from the controller
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   *
   * @return void
   */
  async getAsset(assetId) {
    return await _findOneAssetRecord({'_id': assetId}, this.Asset);
  }

  /**
   * updates an existing asset record, prevents duplication
   *
   * @param {String} assetId - The id of the asset record to update
   * @param {Object} asset - The update object
   *
   * @return void
   */
  async updateAsset(assetId, asset) {
    const assetRecord = await _findOneAssetRecord({'_id': assetId}, this.Asset);
    if (_.isEmpty(assetRecord)) {
      return null;
    }
    _.forEach(asset, (value, key) => {
      assetRecord[key] = value;
    });
    return await assetRecord.save();
  }

  /**
   * removes an asset record
   *
   * @param {object} req - The request arguments passed in from the controller
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   *
   * @return void
   */
  async deleteAsset(assetId) {
    return await this.Asset.findByIdAndDelete({'_id': assetId});
  }
}

module.exports = AssetManagerService;

/**
 * Get the asset record from database
 *
 * @param {object} query - The query to match
 * @param {MongooseSchema} assetDb - The mongose schema instance to be used to retrieve asset record
 *
 * @private
 *
 * @return void
 */
async function _findOneAssetRecord(query, assetDb) {
  return await assetDb.findOne(query);
}

/**
 * saves an asset record
 *
 * @param {object} asset - The list object to save
 * @param {MongooseSchema} assetDb - The mongose schema instance to be used to create the schema and save the record
 *
 * @private
 *
 * @return {object} asset record
 */
async function _saveAssetRecord(assetrecord, assetDb) {
  const newAsset = new assetDb(assetrecord);
  return await newAsset.save();
}