import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();

client.on('connect', function() {
  console.log('Redis client connected to the server');
});

client.on('error', function (err) {
  console.log('Redis client not connected to the server: ' + err);
});

// Promisify the get method
const getAsync = promisify(client.get).bind(client);

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (err, reply) => {
    if (err) {
      console.log('Error setting school:', err);
    } else {
      console.log('Reply:', reply);  // "Reply: OK"
    }
  });
}

// Use async/await for displaySchoolValue
async function displaySchoolValue(schoolName) {
  try {
    const reply = await getAsync(schoolName);
    console.log(reply);  // Displays the value of the school key
  } catch (err) {
    console.log('Error getting school value:', err);
  }
}

// Call functions
displaySchoolValue('ALX');
setNewSchool('ALXSanFrancisco', '100');
displaySchoolValue('ALXSanFrancisco');

