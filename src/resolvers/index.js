const { GraphQLDateTime } = require("graphql-iso-date");
const Query = require("./Query");
const Mutation = require("./Mutation");

const resolvers = {
  Query,
  Mutation,
  DateTime: GraphQLDateTime,
};

module.exports = resolvers;
