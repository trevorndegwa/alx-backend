import redis from 'redis';

const client = redis.createClient();

client.on('error', (err) => console.log(`Redis client not connected to the server: ${err}`));

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.subscribe('ALXchannel');

client.on('message', (channel, message) => {
    if (channel === 'ALXchannel') {
        if (message === 'KILL SERVER') {
            client.unsubscribe('ALXchannel');
            console.log(message);
            client.quit();
        } else {
            console.log(message);
        }
    }
});
