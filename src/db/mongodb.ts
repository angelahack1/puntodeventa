import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'lepago-trading-core';

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return { client: cachedClient, db: cachedClient.db(dbName) };
  }

  const client = new MongoClient(uri as string);
  await client.connect();
  cachedClient = client;

  return { client: cachedClient, db: cachedClient.db(dbName) };
}
