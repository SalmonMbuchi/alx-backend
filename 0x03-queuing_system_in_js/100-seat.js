import { createClient } from 'redis';
import kue from 'kue';
import express from 'express';
import { promisify } from 'util';

const client = createClient();
const key = 'available_seats';
let reservationEnabled;

client.on('error', (err) => console.log('Redis client not connected to the server:', err));

client.on('connect', () => {
  console.log('Redis client connected to the server');

  reserveSeat(50);
  reservationEnabled = true;
});

function reserveSeat(number) {
  client.set('available_seats', number);
}

async function getCurrentAvailableSeats() {
  const getAsync = promisify(client.get).bind(client);
  const seats = await getAsync(key);
  return seats;
}

const queue = kue.createQueue();
const app = express();
const port = 1245;

app.get('/available_seats', async (req, res) => {
  const seats = await getCurrentAvailableSeats(); 
  res.json({'numberOfAvailableSeats': seats});
})

app.get('/reserve_seat', (req, res) => {
  if (reservationEnabled === false) res.json({'status': 'Reservation are blocked'});
  const job = queue.create('reserve_seat').save( function(err) {
    if (!err) res.json({'status': 'Reservation in process'});
    res.json({'status': 'Reservation failed'});
  });
  job.on('complete', function () {
    console.log(`Seat reservation job ${job.id} completed`);
  }).on('failed', function(err) {
      console.log(`Seat reservation job ${job.id} failed:`, err);
  });
})

app.get('/process', (req, res) => {
  queue.process('reserve_seat', async function(job, done) {
    let seats = await getCurrentAvailableSeats();
    if (seats <= 0) done(new Error('Not enough seats available'));
    const available_seats = seats - 1;
    reserveSeat(available_seats);
    if (available_seats === 0) reservationEnabled = false;
  });
  res.json({'status': 'Queue processing'});
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})
