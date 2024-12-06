import redis from 'redis';
import util from 'util'; // Import the util module

// Create a Redis client and connect to the Redis server
const client = redis.createClient({
  url: 'redis://127.0.0.1:6379', // Connect to the Redis server running locally on the default port
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Promisify the client.get method using util.promisify
const getAsync = util.promisify(client.get).bind(client);

// Function to set a new school in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (error, response) => {
    if (error) {
      console.log(`Error setting ${schoolName}: ${error.message}`);
    } else {
      console.log(`Reply: ${response}`); // Expected: OK
    }
  });
}

// Function to display the value of a school using async/await
let displaySchoolValue = async (schoolName) => {
  try {
    const value = await getAsync(schoolName);  // Use the promisified getAsync
    console.log(value || 'not found');  // Expected: School or not found if the key doesn't exist
  } catch (err) {
    console.log(`Error retrieving value for ${schoolName}: ${err.message}`);
  }
};

// Start the Redis client connection and run functions
client.connect()
  .then(() => {
    // After the connection is established, run the functions
    displaySchoolValue('Holberton');  // Expected to print: School (if set previously)
    setNewSchool('HolbertonSanFrancisco', '100');  // Expected to reply: OK
    displaySchoolValue('HolbertonSanFrancisco');  // Expected to print: 100
  })
  .catch((err) => {
    console.log(`Connection failed: ${err.message}`);
  });

