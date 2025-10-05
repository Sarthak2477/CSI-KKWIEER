const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://sarthakp8074_db_user:JfSovTLpEyjdtT5C@cluster-csi.cz17liw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-CSI";
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, answers, timeSpent, violations, totalQuestions } = req.body;

  if (!username || !answers) {
    return res.status(400).json({ error: "Username and answers are required" });
  }

  try {
    await client.connect();
    const db = client.db("test");
    const results = db.collection("testresults");
    const tests = db.collection("tests");

    // Fetch correct answers from questions
    const questions = await tests.find({}).toArray();
    
    // Calculate actual score
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] && answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const testResult = {
      username,
      answers,
      timeSpent,
      violations: violations || 0,
      totalQuestions,
      submittedAt: new Date(),
      score: correctAnswers
    };

    await results.insertOne(testResult);
    
    res.json({ success: true, message: "Test results saved successfully", score: correctAnswers, totalQuestions });
  } catch (err) {
    console.error('Submit test error:', err);
    res.status(500).json({ error: "Failed to save test results" });
  } finally {
    await client.close();
  }
}