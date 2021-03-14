import { mongoService } from "../../../database"
import { PRODUCT_COLLECTION } from "../../../database/collections";
import { ListSearchParams } from "../../../types";
import { getPagination } from "../../../utils/pagination";
import { PaginatedProducts } from "../types";

export const getProducts = async (listSearchParams: ListSearchParams): Promise<PaginatedProducts> => {
    const productRepository = mongoService.getCollection(PRODUCT_COLLECTION);

    const { searchValue } = listSearchParams;
    const { sort, skip, limit } = getPagination(listSearchParams);

    const pipeline: object[] = [];

    let filter = {};
    
    if (!!searchValue) {
        filter = {
            name: { '$regex' : searchValue, '$options' : 'i' }
        }
    }

    if (Object.keys(sort).length) {
      pipeline.push({ $sort: sort });
    }

    pipeline.push({ $match: filter });
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    const cursor = productRepository.aggregate(pipeline);

    const [items, total] = await Promise.all([
        cursor.toArray(),
        productRepository.find(filter).count()
    ]);

    return { items, total }
}