import { MongoClient, Collection } from "mongodb";
import { config } from "../config";
import { IMongoService } from "./types";

// Initialize connection once
let client: MongoClient | null;
async function initMongoConnection() {
  if (!client && config.mongo.uri) {
    // If theres and active connection promise we use it for all requests
    client = new MongoClient(config.mongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 100
    });

    await client.connect();
}
  return client;
}

function getMongoDatabase() {
  if (!client) {
    throw new Error("Not initialized database connection");
  }
  return client.db();
}

async function closeMongoConnection(): Promise<void> {
  if (!client) return;

  await client.close();

  client = null;
}

export const mongoService: IMongoService = {
  getMongoDatabase,
  closeMongoConnection,
  initMongoConnection,
  getCollection: (collectionName: string): Collection => {
    const database = getMongoDatabase();
    return database.collection(collectionName);
  }
};