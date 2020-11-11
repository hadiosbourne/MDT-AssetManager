'use strict';

// This file is used to export the model Schemas
const PermissionRoles = require('./PermissionRoles');
const Asset = require('./Asset');

// Export all the schema for ease of access.
module.exports = {
  PermissionRoles: PermissionRoles,
  Asset: Asset
};