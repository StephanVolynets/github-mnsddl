import { MongoClient } from 'mongodb';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'app';

let db;

try {
  const client = new MongoClient(connectionString, {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
  });

  console.log('Connecting to MongoDB...');
  await client.connect();
  console.log('Successfully connected to MongoDB.');

  db = client.db(dbName);

  // Test database connection
  await db.command({ ping: 1 });
  console.log('Database connection verified.');

} catch (error) {
  console.error('MongoDB connection error:', error);
  process.exit(1);
}

export default db;