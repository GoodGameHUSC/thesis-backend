const CronJob = require('cron').CronJob;

export default class CronJobManager {

  static libJob = [];

  static pattern = {
    everySecond: '* * * * * *'
  };
  /**
   * 
   * @param {String} name Cron Job Name
   * @param {String} pattern Cron Pattern
   * @param {Function} onTick Task will run
   * @param {Function} onComplete Run when it stop
   * @param {Boolean} isStartNow Start right now or not
   * @param {String} timeZone Runner timezone
   */
  static registerNewCronjob(name, pattern, onTick, onComplete = null, isStartNow = false, timeZone = 'UTC') {
    const job = new CronJob(
      pattern,
      onTick,
      onComplete,
      isStartNow,
      timeZone
    );
    this.libJob.push(new RegistrableCronjob(name, job));
    // job.start();
    return job;
  }

  /**
   * 
   * @param {CronJob} job Job which want to start
   */
  static startCronjob(job) {
    job.start();
  }
  static stopCronjob(job) {
    job.stop();
  }
}

class RegistrableCronjob {
  name = null;
  job = null;

  constructor(name, job) {
    if (name && job instanceof CronJob) {
      this.name = name;
      this.job = job;
    } else throw new Error('Invalid RegistrableCronjob Parameter')
  }

  toJSON() {
    return {
      name: this.name,
      pattern: this.job.cronTime.source,
      timeZone: this.job.cronTime.zone,
      running: this.job.running,
      processID: process.pid,
      memory: process.memoryUsage(),
    }
  }
}