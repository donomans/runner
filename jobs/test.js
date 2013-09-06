"use strict";

var workJob = new (require('workerJobs'))()

var config = {
  /* add configuration here for a test task/job */
  jobName: 'test',
  frequency: 'immediate'
}

workJob.config = config

/// this is a test task/job
workJob.job(
  function(){//id, cb) {
  ///Run the task
  console.log('ran the test job')
  //cb(void 0, 'success', id)
})

module.exports = workJob