const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://sarthakp8074_db_user:JfSovTLpEyjdtT5C@cluster-csi.cz17liw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-CSI";
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, answers, flaggedQuestions, currentQuestion, timeLeft, violations, testStarted } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    await client.connect();
    const db = client.db("test");
    const drafts = db.collection("draft");

    const draftData = {
      username,
      answers: answers || {},
      flaggedQuestions: flaggedQuestions || [],
      currentQuestion: currentQuestion || 0,
      timeLeft: timeLeft || 3600,
      violations: violations || 0,
      testStarted: testStarted || false,
      lastUpdated: new Date()
    };

    await drafts.replaceOne(
      { username },
      draftData,
      { upsert: true }
    );
    
    res.json({ success: true });
  } catch (err) {
    console.error('Save draft error:', err);
    res.status(500).json({ error: 'Failed to save draft' });
  } finally {
    await client.close();
  }
}