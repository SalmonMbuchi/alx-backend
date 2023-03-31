import kue from 'kue';
const queue = kue.createQueue();

const job = queue.create('push_notification_code', {
  phoneNumber: '724342184',
  message: 'Hello world',
}).save();
job.on('complete', function() {
  console.log('Notification job completed');
}).on('enqueue', function () {
    console.log(`Notification job created: ${job.id}`);
}).on('failed', function () {
    console.log('Notification job failed');
});
