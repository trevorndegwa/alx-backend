// Import the redis library
import redis from 'redis';

// Create a Redis client
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

// Connect to Redis server
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Log any errors during the connection process
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});
