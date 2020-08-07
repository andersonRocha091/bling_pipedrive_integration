const { config } = require("dotenv");
const { join } = require("path");
const { ok } = require("assert");
const env = process.env.NODE_ENV || "dev";
ok(
  env === "prod" || env === "dev",
  "env is invalid, it must be production, or dev"
);

const configPath = join(__dirname, "./config", `.env.${env}`);
config({
  path: configPath,
});

const Hapi = require("@hapi/hapi");
const Vision = require("@hapi/vision");
const Inert = require("@hapi/inert");
const HapiSwagger = require("hapi-swagger");
const HapiJwt = require("hapi-auth-jwt2");

const Context = require("./db/strategies/base/ContextStrategy");
const MongoDB = require("./db/strategies/mongodb/MongoDB");
const Schema = require("./db/strategies/mongodb/schemes/RevenueSchema");
const RevenueRoutes = require("./routes/RevenueRoutes");
const PipedriveRoutes = require("./routes/PipedriveRoutes");
const UtilRoute = require("./routes/UtilRoutes");

const app = new Hapi.Server({
  port: process.env.PORT,
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
function mapRoutes(instance, methods) {
  return methods.map((method) => instance[method]());
}

async function main() {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, Schema));

  await app.register([Inert, Vision]);

  //Creating auth strategy
  // app.auth.strategy("jwt", "jwt", {
  //   key: JWT_SECRET,
  //   validate: async (dado, request) => {
  //     const [result] = await contextPostgres.read({
  //       username: dado.username.toLowerCase(),
  //     });
  //     if (!result) {
  //       return {
  //         isValid: false,
  //       };
  //     }
  //     return {
  //       isValid: true,
  //     };
  //   },
  // });

  // app.auth.default("jwt");

  try {
    await app.start();
    console.log(`Server running at port ${app.info.port}`);
  } catch (error) {
    console.log("erro", error);
  }
  // app.route([
  //   ...mapRoutes(new HeroesRoute(context), HeroesRoute.methods()),
  //   ...mapRoutes(
  //     new AuthRoute(JWT_SECRET, contextPostgres),
  //     AuthRoute.methods()
  //   ),
  //   ...mapRoutes(new UtilRoute(), UtilRoute.methods()),
  // ]);
  app.route([
    ...mapRoutes(new PipedriveRoutes(context), PipedriveRoutes.methods()),
    ...mapRoutes(new RevenueRoutes(context), RevenueRoutes.methods()),
    ...mapRoutes(new UtilRoute(), UtilRoute.methods()),
  ]);
  return app;
}

module.exports = main();
