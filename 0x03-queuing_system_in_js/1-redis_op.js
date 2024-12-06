import redis from 'redis';

const client = redis.createClient();

client.on('connect', function() {
  console.log('Redis client connected to the server');
});

client.on('error', function (err) {
  console.log('Redis client not connected to the server: ' + err);
});

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (err, reply) => {
    if (err) {
      console.log('Error setting school:', err);
    } else {
      console.log('Reply:', reply);  // "Reply: OK"
    }
  });
}

function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.log('Error getting school value:', err);
    } else {
      console.log(reply);  // Displays the value of the school key
    }
  });
}

// Call functions
displaySchoolValue('ALX');
setNewSchool('ALXSanFrancisco', '100');
displaySchoolValue('ALXSanFrancisco');

