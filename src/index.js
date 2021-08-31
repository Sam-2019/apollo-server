const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");

const schema = require("./schema");

const port = process.env.PORT || 4000;

const app = express();
app.use("*", cors());

const server = new ApolloServer({ schema });

async function data() {
  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });
}

data();

app.listen({ port }, () => {
  console.log(
    `Apollo Server on  http://localhost:${port}${server.graphqlPath}`
  );
});
