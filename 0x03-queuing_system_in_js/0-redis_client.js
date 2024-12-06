import { createClient } from 'redis';

const client = createClient({
  url: 'redis://127.0.0.1:6379', // Connect to Redis server running locally on the default port
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Start the client connection
client.connect().catch((err) => {
  console.log(`Connection failed: ${err.message}`);
});

