const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = require("./types");

const resolvers = {
  Query: {},
  Mutation: {},
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
