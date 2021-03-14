import "graphql-import-node";
import { typeDefs, resolvers} from "./graphql";
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";
const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
export default schema;