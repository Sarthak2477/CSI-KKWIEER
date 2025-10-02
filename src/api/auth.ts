const MONGODB_DATA_API_URL = 'https://us-east-1.aws.data.mongodb-api.com/app/data-hnmxb/endpoint/data/v1/action/findOne';
const API_KEY = 'mongodb+srv://sarthakp8074_db_user:JfSovTLpEyjdtT5C@cluster-csi.cz17liw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-CSI'; // Replace with actual key

export const authenticateUser = async (username: string, password: string, secretCode: string) => {
  // Check secret code first
  if (secretCode !== 'CSI2025') {
    throw new Error('Invalid secret code');
  }

  try {
    const response = await fetch(MONGODB_DATA_API_URL, {
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

    if (!response.ok) {
      throw new Error('Database query failed');
    }

    const data = await response.json();
    
    if (data.document) {
      return { success: true, user: { username: data.document.username } };
    } else {
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    throw new Error('Authentication failed');
  }
};