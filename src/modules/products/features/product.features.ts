import { getProducts } from "./../queries/product.queries";
import { mongoService } from "../../../database";
import { ListSearchParams } from "../../../types";
import { Product, ProductParams, PaginatedProducts } from "../types";
import { PRODUCT_COLLECTION } from "../../../database/collections";
import { ObjectID } from "bson";

export const createProduct = async ({name, price, description, inStock = true, category}: ProductParams): Promise<Product> => {
    try {
        const { insertedId } = await mongoService.getCollection(PRODUCT_COLLECTION).insertOne({ name, price, description, inStock, category });
        return { name, price, description, inStock, category, _id: insertedId.toString() };
    } catch (error) {
        throw new Error(error);
    }
}

export const listProducts = (listSearchParams: ListSearchParams): Promise<PaginatedProducts> => {
    try {
        return getProducts(listSearchParams);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProducts = async (ids: string[]): Promise<string[]> => {
    try {
        const mappedIds = ids.map(id => new ObjectID(id))
        const { deletedCount } = await mongoService.getCollection(PRODUCT_COLLECTION).deleteMany({ _id: { $in: mappedIds }});
        if (deletedCount && deletedCount > 0) {
            return ids;
        }  
        return [];
    } catch (error) {
        throw new Error(error);
    }
}