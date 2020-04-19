const redisServerModule = require('redis-server');
const redisServer = new redisServerModule(6379, {
  port: 6379,
  bin: '/usr/local/bin/redis-server'
});

redisServer.open((err) => {
  if (err === null) {
    console.log("Start redis server fail", err);
  }
  else {
    console.log("### Started redis server at port", redisServer.config.port);
  }
})