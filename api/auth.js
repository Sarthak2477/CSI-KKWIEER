export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password, secretCode } = req.body;

  if (!username || !password || !secretCode) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check secret code first
  const validSecretCode = 'CSI2025';
  if (secretCode !== validSecretCode) {
    return res.status(401).json({ error: 'Invalid secret code' });
  }

  try {
    const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-hnmxb/endpoint/data/v1/action/findOne', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': 'f94293f3-b99a-41d6-bc97-c78632fe9c94',
      },
      body: JSON.stringify({
        collection: 'aptiuser',
        database: 'test',
        dataSource: 'Cluster-CSI',
        filter: { username, password }
      }),
    });

    if (!response.ok) {
      throw new Error('Database query failed');
    }

    const data = await response.json();
    
    if (data.document) {
      res.status(200).json({ 
        success: true, 
        user: { 
          username: data.document.username 
        } 
      });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}