'use strict';

module.exports = {
  id: '0002-create-asset-collection',

  up: (db, cb) => {
    db.createCollection('Asset', {collation: {locale: 'en_US', strength: 2}}, cb);
  },
  down: (db, cb) => {
    db.collection('Asset').drop(cb);
  }
};