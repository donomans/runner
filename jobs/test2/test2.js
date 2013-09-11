"use strict";

var workJob = new (require('workerJobs'))()

console.log('this ran before the job ran')

workJob.job(function(promise){//id, cb){
  setTimeout(function(){
    promise.resolve(function(){
      console.log('this took 10 seconds or so to complete')
    })
  },10000)
  console.log('ran the first part of the task: test2')
  //cb(void 0, 'success', id)
  return promise
}).then(function(promise){
  console.log(promise.data)
  console.log('second part of the task - this won\'t run until after the resolve')
  return promise
})

module.exports = workJob