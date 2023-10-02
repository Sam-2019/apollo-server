import { GraphQLDateTime } from "graphql-scalars";
import Query from "./Query/index.js";
import Mutation from "./Mutation/index.js";

const resolvers = {
  Query,
  Mutation,
  DateTime: GraphQLDateTime,
};

export default resolvers;
