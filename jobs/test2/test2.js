"use strict";

var workJob = new (require('workerJobs'))()

console.log('woop woop')

workJob.job(function(){//id, cb){
  console.log('ran the task: test2')
  //cb(void 0, 'success', id)
})

module.exports = workJob