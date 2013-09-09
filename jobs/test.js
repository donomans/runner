"use strict";

var WorkJob = new require('workerJobs')
var workJob = new WorkJob()

var config = {
  /* add configuration here for a test task/job */
  jobName: 'test',
  frequency: 'immediate',
  retry: true
}

workJob.config = config

/// this is a test task/job
workJob.job(
  function(){//id, cb) {
  ///Run the task
  console.log('ran the test job')
  //cb(void 0, 'success', id)
  return 'first part done'
}).then(function(result){
  console.log(result)
  console.log('ran this part too')
})

module.exports = workJob