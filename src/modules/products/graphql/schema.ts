import { gql } from "apollo-server-express";

export const productTypeDefs = gql`
    type Product {
        _id: String
        name: String
        category: String
        description: String
        price: Int
        inStock: Boolean
    }

    input CreateProductParams {
        name: String!
        category: String!
        price: Int!
        description: String
        inStock: Boolean
    }

    input Pagination {
        offset: Int!
        limit: Int!
    }

    enum SortOrder {
        ASC
        DESC
    }

    input SortParams {
        field: String!
        order: SortOrder!
    }

    input ListSearchParams { 
        pagination: Pagination!
        searchValue: String
        sortParams: SortParams
    }

    type PaginatedProducts {
        items: [Product]
        total: Int
    }

    type Query {
        productList(listSearchParams: ListSearchParams!): PaginatedProducts
    }

    type Mutation {
        createProduct(params: CreateProductParams): Product
        deleteProducts(ids: [String]): [String]
    }
`;
