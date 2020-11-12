'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const AssetManagerService = require('../../services/AssetManagerService');
const {Asset} = require('../../models');

describe('AssetManagerService testing scenarios', function test() {
  let sandbox;
  let assetManagerService;
  let assetDb;
  let assetSaveStub;
  let assetFindOneStub;
  let assetDeleteStub;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    assetDb = sandbox.createStubInstance(Asset);
    assetSaveStub = sandbox.stub(Asset.prototype, 'save');
    assetFindOneStub = sandbox.stub(Asset, 'findOne');
    assetDeleteStub = sandbox.stub(Asset, 'findByIdAndDelete');
    assetManagerService = new AssetManagerService(Asset);
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('createAsset test cases', function test() {
    /**
     * Test for the successful return of created product results
     *
     * @covers services/AssetManagerService.createAsset
     */
    it('Testing the successful return of created asset results', async function test() {

      const asset = {
        assetName: 'someName',
        assetType: 'someType'
      };

      let saveResponse = {
        '_id': '5fac43c01a6d1c55835258e5',
        'assetName': 'string',
        'assetType': 'string',
        'created_at': '2020-11-11T20:04:16.402Z',
        'updated_at': '2020-11-11T20:04:16.402Z',
        '__v': 0
      };

      assetSaveStub.resolves(saveResponse);

      const result = await assetManagerService.createAsset(asset);
      assert.deepEqual(result, saveResponse, 'Results does not match');
    });
  });

  describe('getAssets test cases', function test() {
    const sortParam = 'assetName';
    const sortOrder = 1;
    /**
     * Test for the successful return assets listing
     *
     * @covers services/AssetManagerService.getAssets
     */
    it('Testing the successful return of created asset results', async function test() {
      const expectedAggregationQuery = [
        {$sort: {assetName: 1}}
      ];
      let aggregationResponse = {
        skip: function skip(skip) {
          assert.equal(
            skip,
            0,
            'Expected 0 item to be skipped'
          );
          return aggregationResponse;
        },
        limit: function limit(limit) {
          assert.equal(
            limit,
            25,
            'Expected the limit to match the limit passed'
          );
          return aggregationResponse;
        },
        sort: function sort() {
          return aggregationResponse;
        },
        match: function match() {
          return aggregationResponse;
        },
        exec: function exec() {
          return [assetRecord];
        }
      };
      sandbox.stub(Asset, 'aggregate').callsFake((query) => {
        assert.deepEqual(
          query,
          expectedAggregationQuery,
          'Incorrect result object was returned'
        );
        return aggregationResponse;
      });

      let assetRecord = {
        '_id': '5fac43c01a6d1c55835258e5',
        'assetName': 'string',
        'assetType': 'string',
        'created_at': '2020-11-11T20:04:16.402Z',
        'updated_at': '2020-11-11T20:04:16.402Z',
        '__v': 0
      };
      const result = await assetManagerService.getAssets(sortParam, sortOrder);
      assert.deepEqual(result, [assetRecord], 'Results does not match');
    });
  });

  describe('getAsset test cases', function test() {
    const assetId = '5fac43c01a6d1c55835258e5';
    /**
     * Test for the successful return of a single asset record
     *
     * @covers services/AssetManagerService.getAsset
     */
    it('Testing the successful return of a single asset record', async function test() {

      let saveResponse = {
        '_id': '5fac43c01a6d1c55835258e5',
        'assetName': 'string',
        'assetType': 'string',
        'created_at': '2020-11-11T20:04:16.402Z',
        'updated_at': '2020-11-11T20:04:16.402Z',
        '__v': 0
      };

      assetFindOneStub.resolves(saveResponse);

      const result = await assetManagerService.getAsset(assetId);
      assert.deepEqual(result, saveResponse, 'Results does not match');
    });
  });

  describe('updateAsset test cases', function test() {
    const assetId = '5fac43c01a6d1c55835258e5';

    /**
     * Test for the successful return of a single asset record
     *
     * @covers services/AssetManagerService.updateAsset
     */
    it('Testing the successful return of a single asset record', async function test() {
      const asset = {
        assetName: 'someName1',
        assetType: 'someType1'
      };

      let assetRecord = new Asset({
        '_id': '5fac43c01a6d1c55835258e5',
        'assetName': 'string',
        'assetType': 'string',
        'created_at': '2020-11-11T20:04:16.402Z',
        'updated_at': '2020-11-11T20:04:16.402Z',
        '__v': 0
      });
      let updateRecord = new Asset({
        '_id': '5fac43c01a6d1c55835258e5',
        'assetName': 'someName1',
        'assetType': 'someType1',
        'created_at': '2020-11-11T20:04:16.402Z',
        'updated_at': '2020-11-11T20:04:16.402Z',
        '__v': 0
      });

      assetFindOneStub.resolves(assetRecord);
      assetSaveStub.resolves(updateRecord);
      const result = await assetManagerService.updateAsset(assetId, asset);
      assert.deepEqual(result, assetRecord, 'Results does not match');
    });
  });

  describe('deleteAsset test cases', function test() {
    const assetId = '5fac43c01a6d1c55835258e5';
    /**
     * Test for the successful deletion of an asset record
     *
     * @covers services/AssetManagerService.deleteAsset
     */
    it('Testing the successful deletion of an asset record', async function test() {

      let expectedResponse = {
        '_id': '5fac43c01a6d1c55835258e5',
        'assetName': 'string',
        'assetType': 'string',
        'created_at': '2020-11-11T20:04:16.402Z',
        'updated_at': '2020-11-11T20:04:16.402Z',
        '__v': 0
      };
      assetDeleteStub.resolves(expectedResponse);

      const result = await assetManagerService.deleteAsset(assetId);
      assert.deepEqual(result, expectedResponse, 'Results does not match');
    });
  });
});