module.exports = function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }
  jobs.forEach(element => {
    const job = queue.create('push_notification_code_3', element).save() 
    job.on('enqueue', function () {
      console.log(`Notification job created: ${job.id}`); 
    }).on('complete', function () {
        console.log(`Notification job ${job.id} completed`);
    }).on('failed', function(err) {
        console.log(`Notification job ${job.id} failed:`, err);
    }).on('progress', function (progress) {
        console.log(`Notification job ${job.id} ${progress}% complete`);
    });
  });
};
