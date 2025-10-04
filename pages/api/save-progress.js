import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { username, answers, flaggedQuestions, currentQuestion, timeLeft, violations, testStarted } = req.body;
        
        const progressData = {
            answers,
            flaggedQuestions,
            currentQuestion,
            timeLeft,
            violations,
            testStarted,
            lastSaved: new Date()
        };

        await client.connect();
        const db = client.db('aptitude_test');
        const collection = db.collection('aptiuser');
        
        await collection.updateOne(
            { username },
            { $set: { progress: progressData } },
            { upsert: false }
        );

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Save progress error:', error);
        res.status(500).json({ error: 'Failed to save progress' });
    } finally {
        await client.close();
    }
}