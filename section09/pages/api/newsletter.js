import { MongoClient } from 'mongodb';

const USERNAME = process.env.DB_USER
const PASSWORD = process.env.DB_PASS

const connectDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${USERNAME}:${PASSWORD}@nextjs-course.xwyz6pr.mongodb.net/events?retryWrites=true&w=majority`
  );

  return client;
};

const insertDocument = async (client, document) => {
  const db = client.db();

  await db.collection('newsletter').insertOne({ email: userEmail });
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    res.status(201).json({ message: 'Signed up!' });
  }
};

export default handler;
