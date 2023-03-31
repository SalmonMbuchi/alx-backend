import { createClient } from 'redis';

const client = createClient();
client.on('error', function (err) { 
  console.log('Redis client not connected to the server:', err) });
client.on('connect', function () { 
  console.log('Redis client connected to the server')});
client.subscribe('holberton school channel');
client.on('message', function (channel, message) {
  if (message === 'KILL_SERVER') {
    client.unsubscribe(channel);
    client.quit();
  };
  console.log(message);
})
