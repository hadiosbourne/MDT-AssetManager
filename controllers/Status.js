'use strict';

const StatusService = require('../services/StatusService');

/**
 * Gets the status of the service
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {Function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getSystemStatus =  async (req, res, next) => {
  let statusService = new StatusService();
  try {
    const result = await statusService.getSystemStatus();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  } catch (error) {
    res.status(error.code).json(error.message);
    return next();
  }
};

