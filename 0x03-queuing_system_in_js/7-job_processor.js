import kue from 'kue';
const queue = kue.createQueue();
const blacklistedNumbers = ['4153518780', '4153518781'];

queue.process('push_notification_code_2', 2, function (job, done) {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
})

function sendNotification(phoneNumber, message, job, done) {
  if (job.progress(0, 100)) {
    if (blacklistedNumbers.includes(phoneNumber)) {
      const err = new Error(`Phone number ${phoneNumber} is blacklisted`);
      job.failed().error(err);
      done(err);
    } else if (job.progress(50, 100)) {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    done();
    }
  }
};
