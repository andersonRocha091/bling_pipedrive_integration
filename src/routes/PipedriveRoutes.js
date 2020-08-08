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
            start: joi.number().integer().default(0),
            limit: joi.number().integer().default(10),
            status: joi.string().default("all_not_deleted"),
          }),
        },
      },
      handler: async (request) => {
        try {
          const { status, start, limit } = request.query;
          const { data } = await axios.get(
            `${process.env.PIPEDRIVE_API_URL}?status=${status}&start=${start}&limit=${limit}&api_token=${process.env.PIPEDRIVE_TOKEN}`
          );
          // console.log(data);
          return {
            message: "Deals inserted successfully",
            ...data,
          };
        } catch (error) {
          return boom.internal();
        }
      },
    };
  }
}

module.exports = PipedriveRoutes;
