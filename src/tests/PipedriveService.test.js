const assert = require("assert");
const MongoDB = require("../db/strategies/mongodb/MongoDB");
const RevenueSchema = require("../db/strategies/mongodb/schemes/RevenueSchema");
const Context = require("../db/strategies/base/ContextStrategy");
const PipedriveService = require("../services/PipedriveService");

const MOCK_REVENUE_INSERT = {
  value: 314,
  id: "7",
  title: "Item to be inserted",
  update_time: "2020-08-04 11:20:20",
  status: "open",
};
const settings = {
  start: 0,
  limit: 10,
  status: "all_not_deleted",
};

describe("Testing pipedrive services integration", function () {
  this.timeout(15000);
  this.beforeAll(async () => {
    const connection = MongoDB.connect();
    context = new Context(new MongoDB(connection, RevenueSchema));
    pipedriveService = new PipedriveService(
      settings.start,
      settings.limit,
      settings.status,
      context
    );
  });

  it("inserting a revenue into mongo database", async () => {
    const expected = {
      pipedriveId: 7,
      description: "Item to be inserted",
      value: 314,
      year: "2020",
      month: "8",
      day: "4",
    };
    const {
      pipedriveId,
      description,
      value,
      year,
      month,
      day,
    } = await pipedriveService.insertNewRevenue({
      ...MOCK_REVENUE_INSERT,
    });

    assert.deepEqual(
      {
        pipedriveId,
        description,
        value,
        year,
        month,
        day,
      },
      expected
    );
  });

  it(`Getting deals from status: ${settings.status}`, async () => {
    const { result } = await pipedriveService.getDeals(
      settings.start,
      settings.limit,
      settings.status
    );
    assert.ok(result.length > 0);
  });

  it(`Getting all deals per expected number of pages from status: ${settings.status}`, async () => {
    const { page } = await pipedriveService.getAllPipeDriveDeals();
    assert.ok(page >= 0);
  });
});
