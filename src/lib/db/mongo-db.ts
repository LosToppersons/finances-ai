import { MongoClient, ServerApiVersion } from 'mongodb';
import { Transaction, User } from './collectionsTypes';

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

// Usar variável global para armazenar conexão no ambiente de desenvolvimento
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  clientPromise = client.connect();
}

export const connectDB = async () => {
  const client = await clientPromise;
  return client.db();
};

export const getCollections = async () => {
  const db = await connectDB();
  return {
    usersCollection: db.collection<User>('users'),
    transactionsCollection: db.collection<Transaction>('transactions'),
  };
};
