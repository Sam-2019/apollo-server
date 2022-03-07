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
// const { redisClient } = require("./src/services/redis");
// const { graceful, bree } = require("./src/services/bree");
// const { bot } = require("./src/services/telegram");

dotenv.config();

require("./src/db");
const models = require("./src/db/models");
const schema = require("./src/schema");

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

async function data() {
  // await redisClient;
  // await graceful.listen();
  // await bree.start();
  // await bot.launch();
  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });
}

data().catch((err) => console.error(err));

const port = process.env.PORT || 4000;

app.listen({ port }, () => {
  console.log(
    process.env.NODE_ENV === "production"
      ? `server live`
      : `server live on http://localhost:${port}${server.graphqlPath}`
  );
});
