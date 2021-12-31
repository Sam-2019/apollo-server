const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageDisabled,
} = require("apollo-server-core");
const cors = require("cors");
const dotenv = require("dotenv");
const depthLimit = require("graphql-depth-limit");
const { createComplexityLimitRule } = require("graphql-validation-complexity");
const result = dotenv.config();

const { redisClient } = require("./src/services/redis");
const { graceful, bree } = require("./src/services/bree");

require("./src/db");

const models = require("./src/db/models");
const schema = require("./src/schema");

async function data() {
  if (result.error) {
    throw result.error;
  }

  redisClient;
  graceful.listen();
  bree.start();

  const app = express();
  app.use("*", cors());

  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: () => {
      return { models };
    },
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  const port = process.env.PORT || 4000;

  app.listen({ port }, () => {
    console.log(
      `Apollo Server on  http://localhost:${port}${server.graphqlPath}`
    );
  });
}

data().catch((err) => console.error(err));
