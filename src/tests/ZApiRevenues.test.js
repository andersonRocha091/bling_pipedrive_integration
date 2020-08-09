const assert = require("assert");
const mongoose = require("mongoose");
const api = require("../Api");
const MongoDB = require("../db/strategies/mongodb/MongoDB");
const RevenueSchema = require("../db/strategies/mongodb/schemes/RevenueSchema");
const Context = require("../db/strategies/base/ContextStrategy");

let app = {};

// const MOCK_HERO_INITIAL = {
//   nome: "Gavião arqueiro",
//   poder: "mira",
// };
// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxleEx1dGhvciIsImlkIjoxLCJpYXQiOjE1OTEzMTgxNDR9.10qS7Bt-tt0KR3aogMPdoAGl_dd-3KPuR0TA0DyvqY8";
// let MOCK_ID = "";
// const headers = {
//   Authorization: TOKEN,
// };

describe("Api Test Suit", function () {
  this.beforeAll(async () => {
    app = await api;
  });

  this.beforeEach(async () => {
    context = new Context(new MongoDB(mongoose.connection, RevenueSchema));
    await context.deleteAll();
  });

  this.afterAll(async () => {
    context = new Context(new MongoDB(mongoose.connection, RevenueSchema));
    await context.deleteAll();
  });

  it("Must import all deals from pipedrive POST - /deals", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/deals?start=0&limit=10",
      payload: {
        start: 0,
        limit: 10,
        status: "all_not_deleted",
      },
    });
    const { results } = JSON.parse(result.payload);
    assert.ok(results);
  });
});
