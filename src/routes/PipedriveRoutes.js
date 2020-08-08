const joi = require("@hapi/joi");
const boom = require("boom");

const BaseRoute = require("./base/BaseRoute");
const PipedriveService = require("../services/PipedriveService");

const failAction = (request, headers, erro) => {
  throw erro;
};

// const headers = joi
//   .object({
//     authorization: joi.string().required(),
//   })
//   .unknown();
class PipedriveRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }
  getDealsWon() {
    return {
      path: "/deals",
      method: "POST",
      options: {
        validate: {
          failAction,
          payload: joi.object({
            start: joi.number().integer().default(0),
            limit: joi.number().integer().default(10),
            status: joi.string().default("all_not_deleted"),
          }),
        },
      },
      handler: async (request) => {
        try {
          const { status, start, limit } = request.payload;
          const pipedriveService = new PipedriveService(
            start,
            limit,
            status,
            this.db
          );
          const { results } = await pipedriveService.getAllPipeDriveDeals();
          if (results.length > 0) {
            return {
              message: `Deals ${status} inserted successfully`,
              results,
            };
          } else {
            return {
              message: `There was not deals with status: ${status}`,
              results,
            };
          }
        } catch (error) {
          return boom.internal();
        }
      },
    };
  }
}

module.exports = PipedriveRoutes;
