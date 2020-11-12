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

//In real production environment we will generate a key for the tests
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.d7kGs5jRkxyzyq7JoQOicv-L4ffbHdE8tlyrdS1652s';
describe('/assets', function test() {
  before(async function test() {
    const permission = new PermissionRoles(permissionObject);
    await permission.save();
    const asset = new Asset(assetObject);
    await asset.save();
  });
  describe('post', function test() {
    it('should respond with 201 undefined', function test(done) {
      const expectedResponse = {
        '__v': 0,
        'assetName': 'someName',
        'assetType': 'someType'
      };
      api.post('/v1/assets')
        .set('Content-Type', 'application/json')
        .set('authorization', jwtToken)
        .send({
          assetName: 'someName',
          assetType: 'someType'
        })
        .expect(201)
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

  describe('get', function test() {
    it('should respond with 200 undefined', function test(done) {
      const expectedResponse = {
        '__v': 0,
        'assetName': 'someName',
        'assetType': 'someType'
      };
      api.get('/v1/assets')
        .set('Content-Type', 'application/json')
        .set('authorization', jwtToken)
        .expect(200)
        .end(function res(err, res) {
          if (err) {return done(err);}
          delete res.body[0].updated_at;
          delete res.body[0].created_at;
          delete res.body[0]._id;
          res.body[0].should.deep.equal(expectedResponse);
          done();
        });
    });
  });
});
