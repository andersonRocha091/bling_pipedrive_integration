const joi = require("@hapi/joi");
const boom = require("boom");

const BaseRoute = require("./base/BaseRoute");
const PipedriveService = require("../services/PipedriveService");
const BlingService = require("../services/BlingService");

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
          const blingService = new BlingService();
          const pipedriveService = new PipedriveService(
            start,
            limit,
            status,
            this.db
          );
          const { results } = await pipedriveService.getAllPipeDriveDeals();
          let promises = [];
          if (results.length > 0) {
            results.forEach(async (item) => {
              let xml = blingService.createXml(
                item.value,
                "U",
                item.description
              );
              const { result } = await blingService.sendRergisterRevenueRequest(
                xml
              );
              if (result.retorno.contasreceber) {
                await this.db.update(item.id, {
                  blingId: result.retorno.contasreceber[0].contaReceber.id,
                });
              }
            });
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
