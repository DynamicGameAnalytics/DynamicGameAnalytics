var thenRedis = require('then-redis');

var redis = thenRedis.createClient(sails.config.redis);
redis.connect().then(function(){
  sails.log('redis connection established');
}, function(err){
  sails.log.error(err);
});
module.exports = redis;
