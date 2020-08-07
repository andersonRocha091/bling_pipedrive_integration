const joi = require("@hapi/joi");
const boom = require("boom");

const BaseRoute = require("./base/BaseRoute");
const failAction = (request, headers, erro) => {
  throw erro;
};

// const headers = joi
//   .object({
//     authorization: joi.string().required(),
//   })
//   .unknown();
class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }
  list() {
    return {
      path: "/revenues",
      method: "GET",
      options: {
        validate: {
          failAction,
          query: joi.object({
            skip: joi.number().integer().default(0),
            limit: joi.number().integer().default(10),
            name: joi.string().min(3).max(100),
          }),
        },
      },
      handler: (request, headers) => {
        try {
          const { skip, limit, name } = request.query;
          const query = { nome: { $regex: `.*${name}*.` } };
          return this.db.read(name ? query : {}, skip, limit);
        } catch (error) {
          return boom.internal();
        }
      },
    };
  }

  create() {
    return {
      path: "/revenues",
      method: "POST",
      options: {
        validate: {
          failAction,
          payload: joi.object({
            event: joi.string().required(),
            current: joi.object().required(),
            meta: joi.object().required(),
          }),
          headers,
        },
      },
      handler: async (request) => {
        try {
          const { value, description, year, month, day } = request.payload;
          const result = await this.db.create({
            value,
            description,
            year,
            month,
            day,
          });
          return {
            message: "Revenue inserted successfully",
            _id: result._id,
          };
        } catch (error) {
          return boom.internal();
        }
      },
    };
  }

  update() {
    return {
      path: "/revenues/{id}",
      method: "PATCH",
      options: {
        validate: {
          failAction,
          params: joi.object({
            id: joi.string().required(),
          }),
          payload: joi.object({
            nome: joi.string().min(3).max(100),
            poder: joi.string().min(2).max(100),
          }),
          headers,
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const { payload } = request;
          const dadosString = JSON.stringify(payload);
          const dados = JSON.parse(dadosString);

          const result = await this.db.update(id, dados);
          if (result.nModified !== 1)
            return boom.preconditionFailed("Cant update hero");
          return {
            message: "Revenue updated successfully",
          };
        } catch (error) {
          return boom.internal();
        }
      },
    };
  }

  delete() {
    return {
      path: "/revenues/{id}",
      method: "DELETE",
      options: {
        validate: {
          failAction,
          params: joi.object({
            id: joi.string().required(),
          }),
          headers,
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const result = await this.db.delete(id);
          if (result.n !== 1) {
            return boom.preconditionFailed("Id Not Found");
          }

          return {
            message: "Revenue removed successfully",
          };
        } catch (error) {
          return boom.internal();
        }
      },
    };
  }
}

module.exports = HeroRoutes;
