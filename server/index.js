const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const API_KEY = 'f94293f3-b99a-41d6-bc97-c78632fe9c94';
const MONGODB_URL = 'https://us-east-1.aws.data.mongodb-api.com/app/data-hnmxb/endpoint/data/v1/action';

app.use(cors());
app.use(express.json());

// Auth endpoint
app.post('/api/auth', async (req, res) => {
  const { username, password, secretCode } = req.body;

  if (!username || !password || !secretCode) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (secretCode !== 'CSI2025') {
    return res.status(401).json({ error: 'Invalid secret code' });
  }

  try {
    const response = await fetch(`${MONGODB_URL}/findOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
      body: JSON.stringify({
        collection: 'aptiuser',
        database: 'test',
        dataSource: 'Cluster-CSI',
        filter: { username, password }
      }),
    });

    const data = await response.json();
    
    if (data.document) {
      res.json({ 
        success: true, 
        user: { username: data.document.username } 
      });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Questions endpoint
app.get('/api/questions', async (req, res) => {
  try {
    const response = await fetch(`${MONGODB_URL}/find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
      body: JSON.stringify({
        collection: 'tests',
        database: 'test',
        dataSource: 'Cluster-CSI',
      }),
    });

    const data = await response.json();
    const questions = data.documents;
    
    const formattedQuestions = questions.map((q, index) => ({
      id: index,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      image: q.image || undefined
    }));
    
    res.json({ questions: formattedQuestions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});