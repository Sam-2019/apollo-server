const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const dotenv = require("dotenv");
const depthLimit = require("graphql-depth-limit");
const { createComplexityLimitRule } = require("graphql-validation-complexity");

dotenv.config();

require("./src/db");
const models = require("./src/db/models");
const schema = require("./src/schema");
const { getUser } = require("./src/utils/jwt");
// const { redisClient } = require("./src/services/redis");
// const { graceful, bree } = require("./src/services/bree");
// const { bot } = require("./src/services/telegram");

const app = express();
app.use("*", cors());

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    // try to retrieve a user with the token
    const user = getUser(token);
    console.log({data: user});
    return { models, user };
  },
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
