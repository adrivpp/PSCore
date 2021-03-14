import {
    MongoClient,
    Db,
    Collection
} from "mongodb";


export interface IMongoService {
    getMongoDatabase: () => Db;
    closeMongoConnection: () => Promise<void>;
    initMongoConnection: () => Promise<MongoClient | null>;
    getCollection: (collectionName: string) => Collection;
}