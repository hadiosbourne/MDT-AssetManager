'use strict';

const AssetManagerService = require('../services/AssetManagerService');
/**
 * creates an asset record
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.createAsset = async (req, res, next) => {
  const assetManagerService = new AssetManagerService();
  const asset = req.swagger.params.asset.value;
  try {
    const result = await assetManagerService.createAsset(asset);
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  } catch (error) {
    res.status(error.code).json(error.message);
    return next();
  }
};

/**
 * returns list of assets
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getAssets = async (req, res, next) => {
  const assetManagerService = new AssetManagerService();
  const sortParam = req.swagger.params.sort_parameter.value;
  const sortOrder = req.swagger.params.sort_order.value;
  try {
    const result = await assetManagerService.getAssets(sortParam, sortOrder);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  } catch (error) {
    res.status(error.code).json(error.message);
    return next();
  }
};

/**
 * updates an asset record
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.updateAsset = async (req, res, next) => {
  const assetManagerService = new AssetManagerService();
  const asset = req.swagger.params.asset.value;
  const assetId = req.swagger.params.asset_id.value;
  try {
    const result = await assetManagerService.updateAsset(assetId, asset);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  } catch (error) {
    res.status(error.code).json(error.message);
    return next();
  }
};

/**
 * gets a specific asset record
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getAsset = async (req, res, next) => {
  const assetManagerService = new AssetManagerService();
  const assetId = req.swagger.params.asset_id.value;
  try {
    const result = await assetManagerService.getAsset(assetId);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  } catch (error) {
    res.status(error.code).json(error.message);
    return next();
  }
};

/**
 * deletes an asset record
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.deleteAsset = async (req, res, next) => {
  const assetManagerService = new AssetManagerService();
  const assetId = req.swagger.params.asset_id.value;
  try {
    const result = await assetManagerService.deleteAsset(assetId);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  } catch (error) {
    res.status(error.code).json(error.message);
    return next();
  }
};