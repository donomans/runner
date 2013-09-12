"use strict";
function Test(){
this.WorkJob = require('workerJobs')
this.workJob = new this.WorkJob()

this.config = {
  /* add configuration here for a test task/job */
  jobName: 'test',
  frequency: 'immediate',
  retry: true
}

this.workJob.config = this.config

/// this is a test task/job
this.workJob.job(function(promise){
  ///Run the task
  console.log('ran the test job')
  
  
  promise.then(function(promise){
    console.log('ran this part too')
  }).then(function(promise){
    console.log('got this from previous part: ' + promise.config.jobName)
  })
  promise.resolve()
})
}
module.exports = Test//workJob