const joi = require("@hapi/joi");
const boom = require("boom");
const axios = require("axios");

const BaseRoute = require("./base/BaseRoute");
const failAction = (request, headers, erro) => {
  throw erro;
};

const headers = joi
  .object({
    authorization: joi.string().required(),
  })
  .unknown();
class PipedriveRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }
  getDealsWon() {
    return {
      path: "/deals",
      method: "GET",
      options: {
        validate: {
          failAction,
          query: joi.object({
            skip: joi.number().integer().default(0),
            limit: joi.number().integer().default(10),
          }),
        },
      },
      handler: (request, headers) => {
        try {
          const { skip, limit } = request.query;

          return this.db.read(name ? query : {}, skip, limit);
        } catch (error) {
          return boom.internal();
        }
      },
    };
  }
}

module.exports = PipedriveRoutes;
