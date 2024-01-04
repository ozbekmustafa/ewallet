const Redis = require('ioredis')
let redisClient = new Redis({ "host": process.env.REDIS_HOST, "port": process.env.REDIS_PORT });

redisClient.on('connect', () => {
    console.log('Redis client connected');
    redisClient.select(0);
});

redisClient.on('error', (err) => {
    console.log('Redis Client Error', err);
});

module.exports = redisClient;
