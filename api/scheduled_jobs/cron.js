const CronJob = require("node-cron");

exports.initScheduledJobs = (db) => {
  const scheduledJobFunction = CronJob.schedule("* * * * *", () => {
    let datenow = new Date();
    console.log(`Schedule job runs every minute at: ${datenow}`);
    //console.log(db);
    // Handle logic of create snapshot here with the db connection
  });

  scheduledJobFunction.start();
}