const { createClient } = require('redis');

const redis = async () => {
  return await createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect();
}
module.exports = redis;