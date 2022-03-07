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

const app = express();
app.use("*", cors());

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: () => {
    return { models };
  },
});

async function data() {
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
