import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('User');
    const data = await collection.find({}).toArray();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the database' });
  }
}
