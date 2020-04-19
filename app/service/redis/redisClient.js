import env from "../../config/env";

const redis = require("redis");

var redisHost = env.REDIS_HOST;
var redisPort = env.REDIS_PORT;
var redisAuth = env.REDIS_PASSWORD;

var redisClient = redis.createClient({
  port: redisPort,
  host: redisHost
});

redisClient.auth(redisAuth, function (err, response) {
  if (err) {
    throw err;
  }
});

export default redisClient;