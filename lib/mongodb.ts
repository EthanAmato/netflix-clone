import { MongoClient, Db, MongoClientOptions } from 'mongodb';

const uri = process.env.DATABASE_URL!;
const dbName = process.env.DATABASE_NAME!;

let cachedDb: Db|null = null;


export async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri);

  const db = client.db(dbName);
  cachedDb = db;
  return db;
}
