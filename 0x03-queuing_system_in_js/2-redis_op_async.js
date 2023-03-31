import { createClient } from 'redis';
import redis from 'redis';
import { promisify } from 'util';

const client = createClient();
client.on('error', function (err) { 
  console.log('Redis client not connected to the server:', err) });
client.on('connect', function () { 
  console.log('Redis client connected to the server')});

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

async function displaySchoolValue(schoolName) {
  const getAsync = promisify(client.get).bind(client); 
  const value = await getAsync(schoolName);
  console.log(value);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
