export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-hnmxb/endpoint/data/v1/action/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': 'your-mongodb-data-api-key',
      },
      body: JSON.stringify({
        collection: 'tests',
        database: 'test',
        dataSource: 'Cluster-CSI',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from MongoDB');
    }

    const data = await response.json();
    const questions = data.documents;
    
    const formattedQuestions = questions.map((q, index) => ({
      id: index,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      image: q.image || undefined
    }));
    
    res.status(200).json({ questions: formattedQuestions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
}