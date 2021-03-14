import { GraphQLResolverMap } from "apollo-graphql";
import { createProduct, deleteProducts, listProducts } from "../features/product.features";

export const productResolvers: GraphQLResolverMap = {
    Query: {
        productList: (_, { listSearchParams }) => {
            return listProducts(listSearchParams);
        }
    },
    Mutation: {
        createProduct: (_, { params }) => {
            const { name, price, description, inStock, category } = params;
            return createProduct({ name, price, description, inStock, category });
        },
        deleteProducts: (_, { ids }) => {
            return deleteProducts(ids);
        }
    }
}