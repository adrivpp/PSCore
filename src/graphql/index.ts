import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import { productTypeDefs, productResolvers } from "../modules/products";

const allTypeDefs = [
    productTypeDefs,
]

const allResolvers = [
    productResolvers,
]

export const resolvers = mergeResolvers(allResolvers);

export const typeDefs = mergeTypes(allTypeDefs);