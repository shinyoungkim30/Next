import { MongoClient } from 'mongodb';

const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASS;

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${USERNAME}:${PASSWORD}@nextjs-course.xwyz6pr.mongodb.net/events?retryWrites=true&w=majority`
  );

  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
};

export const getAllDocuments = async (client, collection, sort) => {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
};
