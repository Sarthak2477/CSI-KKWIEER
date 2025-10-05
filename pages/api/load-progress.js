import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { username } = req.query;
        
        await client.connect();
        const db = client.db('test');
        const collection = db.collection('aptiuser');
        
        const user = await collection.findOne({ username });
        
        res.status(200).json({ progress: user?.progress || null });
    } catch (error) {
        console.error('Load progress error:', error);
        res.status(500).json({ error: 'Failed to load progress' });
    } finally {
        await client.close();
    }
}