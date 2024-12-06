0x03. Queuing System in JS
==========================

Back-endJavaScriptES6RedisNodeJSExpressJSKue

-   By: Trevor Ndegwa

![](https://s3.amazonaws.com/alx-intranet.hbtn.io/uploads/medias/2020/1/1486e02a78cdf7b4557c.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDDGGGOUSBVO6H7D%2F20220815%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220815T195509Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=35ec3a36d25c73a134fb0de3065010e6c5f93cba917db5eebd0ee999f3a10511)

Resources
---------

**Read or watch**:

-   [Redis quick start](https://alx-intranet.hbtn.io/rltoken/8xeApIhnxgFZkgn54BiIeA "Redis quick start")
-   [Redis client interface](https://alx-intranet.hbtn.io/rltoken/1rq3ral-3C5O1t67dbGcWg "Redis client interface")
-   [Redis client for Node JS](https://alx-intranet.hbtn.io/rltoken/mRftfl67BrNvl-RM5JQfUA "Redis client for Node JS")
-   [Kue](https://alx-intranet.hbtn.io/rltoken/yTC3Ci2IV2US24xJsBfMgQ "Kue") *deprecated but still use in the industry*

Learning Objectives
-------------------

At the end of this project, you are expected to be able to [explain to anyone](https://alx-intranet.hbtn.io/rltoken/7yh7c3Zyy1RyUsdwlfsyDg "explain to anyone"), **without the help of Google**:

-   How to run a Redis server on your machine
-   How to run simple operations with the Redis client
-   How to use a Redis client with Node JS for basic operations
-   How to store hash values in Redis
-   How to deal with async operations with Redis
-   How to use Kue as a queue system
-   How to build a basic Express app interacting with a Redis server
-   How to the build a basic Express app interacting with a Redis server and queue

Requirements
------------

-   All of your code will be compiled/interpreted on Ubuntu 18.04, Node 12.x, and Redis 5.0.7
-   All of your files should end with a new line
-   A `README.md` file, at the root of the folder of the project, is mandatory
-   Your code should use the `js` extension

Required Files for the Project
------------------------------

### `package.json`

Click to show/hide file contents

```
{
    "name": "queuing_system_in_js",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "lint": "./node_modules/.bin/eslint",
      "check-lint": "lint [0-9]*.js",
      "test": "./node_modules/.bin/mocha --require @babel/register --exit",
      "dev": "nodemon --exec babel-node --presets @babel/preset-env"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "chai-http": "^4.3.0",
      "express": "^4.17.1",
      "kue": "^0.11.6",
      "redis": "^2.8.0"
    },
    "devDependencies": {
      "@babel/cli": "^7.8.0",
      "@babel/core": "^7.8.0",
      "@babel/node": "^7.8.0",
      "@babel/preset-env": "^7.8.2",
      "@babel/register": "^7.8.0",
      "eslint": "^6.4.0",
      "eslint-config-airbnb-base": "^14.0.0",
      "eslint-plugin-import": "^2.18.2",
      "eslint-plugin-jest": "^22.17.0",
      "nodemon": "^2.0.2",
      "chai": "^4.2.0",
      "mocha": "^6.2.2",
      "request": "^2.88.0",
      "sinon": "^7.5.0"
    }
  }
```

### `.babelrc`

Click to show/hide file contents

```
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

### and...

Don't forget to run `$ npm install` when you have the `package.json`

## Task 0: Install Redis

Steps to set up Redis:
1. Download Redis: `wget http://download.redis.io/releases/redis-6.0.10.tar.gz`
2. Extract the archive: `tar xzf redis-6.0.10.tar.gz`
3. Compile Redis: `make`
4. Start the Redis server: `src/redis-server &`
5. Verify the server: `src/redis-cli ping` (should return `PONG`)

Perform the following Redis operations:
- Set a key: `set Holberton School`
- Get a key: `get Holberton`

After completion, copy the `dump.rdb` file to the project directory.

## Task 1: Node Redis Client

Steps to connect to the Redis server using Node.js:

1. Install `node_redis` (Redis client for Node.js) by running the following command in your project directory:
   ```bash
   npm install redis
   ```

2. Write a script named `0-redis_client.js` to connect to the Redis server:
   - Import the `createClient` method from the `redis` package.
   - Set up event listeners to log whether the connection is successful or if it fails.

   The script should look like this:

   ```javascript
   import { createClient } from 'redis';

   const client = createClient();

   client.on('error', (err) => console.log(`Redis client not connected to the server: ${err}`));
   client.on('connect', () => {
       console.log('Redis client connected to the server');
   });
   ```

3. Run the script using `npm run dev 0-redis_client.js`.

4. Expected output:
   - If the Redis server is running and the connection is successful, it should log:
     ```
     Redis client connected to the server
     ```
   - If there is an issue connecting, it should log:
     ```
     Redis client not connected to the server: [Error details]
     ```

---
