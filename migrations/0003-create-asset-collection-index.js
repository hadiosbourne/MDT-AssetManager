'use strict';

let indexObj = {
  'assetName': 1,
  'assetType': 1
};
module.exports = {
  id: '0003-create-asset-collection-index',

  up: (db, cb) => {
    db.collection('Asset').createIndex(indexObj, {background: true, name: 'asset_index'}, cb);
  },

  down: (db, cb) => {
    cb();
  }
};