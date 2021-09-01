const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const dotenv = require("dotenv");

require("./db");
const models = require("./db/models");
const schema = require("./schema");

dotenv.config();

const app = express();
app.use("*", cors());

const server = new ApolloServer({
  schema,
  context: () => {
    return { models };
  },
});

async function data() {
  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });
}

data();

const port = process.env.PORT || 4000;

app.listen({ port }, () => {
  console.log(
    `Apollo Server on  http://localhost:${port}${server.graphqlPath}`
  );
});
