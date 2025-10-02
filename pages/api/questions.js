export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const API_KEY = 'f94293f3-b99a-41d6-bc97-c78632fe9c94';
  const MONGODB_URL = 'https://us-east-1.aws.data.mongodb-api.com/app/data-hnmxb/endpoint/data/v1/action';

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
}