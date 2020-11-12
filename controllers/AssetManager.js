'use strict';
const {Asset} = require('../models');

const AssetManagerService = require('../services/AssetManagerService');

/**
 * creates an asset record, it prevents duplicate records with the same type and name to be created
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.createAsset = async (req, res, next) => {
  const assetManagerService = new AssetManagerService(Asset);
  const asset = req.swagger.params.asset.value;
  try {
    const result = await assetManagerService.createAsset(asset);
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json(`Duplicates Error, and existing record with the name [${asset.assetName}] and type [${asset.assetType}] already exists`);
    } else {
      res.status(error.code).json(error.message);
    }
    return next();
  }
};

/**
 * returns list of assets based on the given sort param, sort order, asset name and asset type
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getAssets = async (req, res, next) => {
  const assetManagerService = new AssetManagerService(Asset);
  const sortParam = req.swagger.params.sort_parameter.value;
  const sortOrder = req.swagger.params.sort_order.value;
  const name = req.swagger.params.name.value;
  const type = req.swagger.params.type.value;
  try {
    const result = await assetManagerService.getAssets(sortParam, sortOrder, name, type);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  } catch (error) {
    res.status(error.code).json(error.message);
    return next();
  }
};

/**
 * updates an asset record, prevets duplication
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.updateAsset = async (req, res, next) => {
  const assetManagerService = new AssetManagerService(Asset);
  const asset = req.swagger.params.asset.value;
  const assetId = req.swagger.params.asset_id.value;
  try {
    const result = await assetManagerService.updateAsset(assetId, asset);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json(`Duplicates Error, and existing record with the name [${asset.assetName}] and type [${asset.assetType}] already exists`);
    } else {
      res.status(error.code).json(error.message);
    }
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
  const assetManagerService = new AssetManagerService(Asset);
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
  const assetManagerService = new AssetManagerService(Asset);
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