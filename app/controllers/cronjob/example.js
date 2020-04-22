import CronJobManager from '../../service/libs/cronjob';
const job = CronJobManager.registerNewCronjob('sync_snow_subscription',
  "* * * * * *",
  () => {
    console.log("sync_snow_subscription is running")
  })
// setTimeout(() =>
//   CronJobManager.startCronjob(job)
//   , 2000)
module.exports = job;

