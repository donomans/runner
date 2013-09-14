"use strict";
module.exports = Test
module.exports.config = {
  /* add configuration here for a test task/job */
  jobName: 'test',
  frequency: 'immediate',
  retry: true
}

function Test(){
  var WorkJob = require('workerJobs')
  this.workJob = new WorkJob()
  
  
  this.workJob.config = module.exports.config
  
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
