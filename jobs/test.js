"use strict";

var WorkJob = require('workerJobs')
var workJob = new WorkJob()

var config = {
  /* add configuration here for a test task/job */
  jobName: 'test',
  frequency: 'immediate',
  retry: true
}

workJob.config = config

/// this is a test task/job
workJob.job(function(){
  ///Run the task
  console.log('ran the test job')
  return 'first part done'
}).then(function(result){
  console.log('got this from previous part: ' + result)
  console.log('ran this part too')
  return result + ', second part done too';
}).then(function(result){
  console.log('got this from previous part: ' + result)
})

module.exports = workJob