'use strict';

const chai = require('chai');
const supertest = require('supertest');
const api = supertest('http://localhost:4000'); // supertest init;
const {PermissionRoles, Asset} = require('../../models');
chai.should();

const permissionObject = {
  'role': 'admin',
  'accessLevels': [
    'read',
    'write',
    'update',
    'delete'
  ]
};

const assetObject = {
  assetName: 'someName',
  assetType: 'someType'
};
let assetId;

//In real production environment we will generate a key for the tests
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.d7kGs5jRkxyzyq7JoQOicv-L4ffbHdE8tlyrdS1652s';
describe('/asset/{asset_id}', function test() {
  before(async function test() {
    const permission = new PermissionRoles(permissionObject);
    await permission.save();
    const asset = new Asset(assetObject);
    const result = await asset.save();
    assetId = result._id;
  });
  describe('get', function test() {
    it('should respond with 200 undefined', function test(done) {
      const expectedResponse = {
        '__v': 0,
        'assetName': 'someName',
        'assetType': 'someType'
      };
      api.get(`/v1/asset/${assetId}`)
        .set('Content-Type', 'application/json')
        .set('authorization', jwtToken)
        .expect(200)
        .end(function res(err, res) {
          if (err) {return done(err);}
          delete res.body.updated_at;
          delete res.body.created_at;
          delete res.body._id;
          res.body.should.deep.equal(expectedResponse);
          done();
        });
    });

  });

  describe('put', function test() {
    it('should respond with 200 undefined', function test(done) {
      const expectedResponse = {
        '__v': 0,
        'assetName': 'someName3',
        'assetType': 'someType3'
      };
      api.put(`/v1/asset/${assetId}`)
        .set('Content-Type', 'application/json')
        .set('authorization', jwtToken)
        .send({
          'assetName': 'someName3',
          'assetType': 'someType3'
        })
        .expect(200)
        .end(function res(err, res) {
          if (err) {return done(err);}
          delete res.body.updated_at;
          delete res.body.created_at;
          delete res.body._id;
          res.body.should.deep.equal(expectedResponse);
          done();
        });
    });

  });

  describe('delete', function test() {
    it('should respond with 200 undefined', function test(done) {
      api.del(`/v1/asset/${assetId}`)
        .set('Content-Type', 'application/json')
        .set('authorization', jwtToken)
        .expect(200)
        .end(function res(err, res) {
          if (err) {return done(err);}
          res.body.should.deep.equal({deletedCount: 1});
          done();
        });
    });

  });

});
