import { MongoClient } from 'mongodb';

const connectDatabase = () => {
  
}

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const client = await MongoClient.connect(
      'mongodb+srv://admin:KvUTzODahH37Yoxt@nextjs-course.xwyz6pr.mongodb.net/events?retryWrites=true&w=majority'
    );
    const db = client.db();

    await db.collection('newsletter').insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: 'Signed up!' });
  }
};

export default handler;
