const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/collegeDocsDB';

let cachedConnection = null;
let connectionPromise = null;

const mongoDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  try {
    connectionPromise = mongoose.connect(MONGO_URI);
    cachedConnection = await connectionPromise;
    console.log('✅ Main MongoDB connected successfully');
    return cachedConnection;
  } catch (err) {
    connectionPromise = null;
    console.error('❌ MongoDB connection error: ', err);
    throw err;
  }
};

module.exports = mongoDB;
