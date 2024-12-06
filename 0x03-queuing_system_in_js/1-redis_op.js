import { createClient } from 'redis';
import util from 'util'; // Import the util module

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

// Function to set a new school
function setNewSchool(schoolName, value) {
  client.set(schoolName, value)
    .then((response) => console.log(`Reply: ${response}`))
    .catch((err) => console.log(`Error setting ${schoolName}: ${err.message}`));
}

// Function to display the value of a school
async function displaySchoolValue(schoolName) {
  try {
    const value = await client.get(schoolName);
    console.log(value || 'not found');  // Only log the value, not the key
  } catch (err) {
    console.log(`Error retrieving value for ${schoolName}: ${err.message}`);
  }
}

// Call the functions as required
async function run() {
  await displaySchoolValue('Holberton');  // Expected to print: School
  await setNewSchool('HolbertonSanFrancisco', '100');  // Expected to reply: OK
  await displaySchoolValue('HolbertonSanFrancisco');  // Expected to print: 100
}

run();
