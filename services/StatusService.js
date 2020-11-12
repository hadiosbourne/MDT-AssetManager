'use strict';

/**
 * The StatusService class
 *
 * @module StatusService
 */
class StatusService {

  constructor() {}

  /**
   * Gets the system status
   */
  async getSystemStatus() {
    const uptime = await Math.floor(process.uptime());
    return  {
      uptime
    };
  }

}

module.exports = StatusService;