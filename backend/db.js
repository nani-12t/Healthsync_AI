import { MongoClient } from 'mongodb';

// Mock database classes for offline/sandboxed development fallback
class MockCollection {
  constructor(name) {
    this.name = name;
    this.data = new Map();
  }

  async findOne(query) {
    for (const doc of this.data.values()) {
      let match = true;
      for (const [qKey, qVal] of Object.entries(query)) {
        if (doc[qKey] !== qVal) {
          match = false;
          break;
        }
      }
      if (match) return doc;
    }
    return null;
  }

  async updateOne(query, update, options) {
    let doc = await this.findOne(query);
    const setFields = update.$set || {};

    if (doc) {
      Object.assign(doc, setFields);
    } else if (options && options.upsert) {
      doc = { ...query, ...setFields };
      const id = Math.random().toString(36).substring(2, 9);
      doc._id = id;
      this.data.set(id, doc);
    }
    return { matchedCount: doc ? 1 : 0, modifiedCount: 1, upsertedId: doc ? doc._id : null };
  }

  async deleteOne(query) {
    for (const [id, doc] of this.data.entries()) {
      let match = true;
      for (const [qKey, qVal] of Object.entries(query)) {
        if (doc[qKey] !== qVal) {
          match = false;
          break;
        }
      }
      if (match) {
        this.data.delete(id);
        return { deletedCount: 1 };
      }
    }
    return { deletedCount: 0 };
  }

  async insertOne(doc) {
    const id = Math.random().toString(36).substring(2, 9);
    const newDoc = { _id: id, ...doc };
    this.data.set(id, newDoc);
    return { insertedId: id };
  }
}

class MockDb {
  constructor(databaseName) {
    this.databaseName = databaseName;
    this.collections = {};
  }
  collection(name) {
    if (!this.collections[name]) {
      this.collections[name] = new MockCollection(name);
    }
    return this.collections[name];
  }
}

let db = null;
let client = null;
let isMock = false;

export async function connectToDatabase() {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DATABASE_NAME || 'healthsync_db';

  if (!uri) {
    console.warn('[DATABASE] MONGODB_URI is not defined. Falling back to Local MongoDB.');
  }

  // 1. Try connecting to configured MongoDB
  if (uri) {
    try {
      console.log('[DATABASE] Connecting to configured MongoDB Atlas cluster...');
      client = new MongoClient(uri, { serverSelectionTimeoutMS: 3000 });
      await client.connect();
      db = client.db(dbName);
      console.log(`[DATABASE] Connected to MongoDB Atlas successfully: ${dbName}`);
      return db;
    } catch (atlasError) {
      console.warn(`[DATABASE] Atlas connection failed: ${atlasError.message}`);
    }
  }

  // 2. Try connecting to Local MongoDB
  try {
    const localUri = 'mongodb://localhost:27017';
    console.log(`[DATABASE] Attempting connection to Local MongoDB at ${localUri}...`);
    client = new MongoClient(localUri, { serverSelectionTimeoutMS: 2000 });
    await client.connect();
    db = client.db(dbName);
    console.log(`[DATABASE] Connected to Local MongoDB successfully: ${dbName}`);
    return db;
  } catch (localError) {
    console.warn(`[DATABASE] Local MongoDB connection failed: ${localError.message}`);
  }

  // 3. Fallback to In-Memory Mock Database
  console.warn('\n========================================================================');
  console.warn(`[DATABASE WARNING] Could not connect to any MongoDB server.`);
  console.warn(`Using in-memory Mock Database fallback for development mode.`);
  console.warn('========================================================================\n');
  
  db = new MockDb(dbName);
  isMock = true;
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return db;
}

export function isDatabaseMock() {
  return isMock;
}

export async function closeDatabaseConnection() {
  if (client && !isMock) {
    await client.close();
    console.log('[DATABASE] MongoDB connection closed.');
  }
  db = null;
  client = null;
  isMock = false;
}

