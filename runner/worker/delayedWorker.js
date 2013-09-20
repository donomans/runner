"use strict";
var lib = require('../lib.js')
var worker = new (require('./worker.js'))()
var scheduleJobQueue = new (require('./scheduleJobQueue.js'))()

scheduleJobQueue.add(JSON.parse(process.argv[2]))



/*
* Use worker to run the jobs this process has been handed
*/
function work(){
  var jobsToQueue = []
  jobsToQueue = scheduleJobQueue.take(5000)//, 5000)
  
  if(worker && !worker.running){
    worker.run(jobsToQueue, jobResult)
  } else {
    worker.addJobs(jobsToQueue)
  }
  jobsToQueue = []
  setTimeout(work, 5 * 1000)
}

function jobResult(err, result, jobId){
}

function shouldBeScheduled(config, timing){
  return true
}

process.on('message', function(message){
  if(message){
    if(message.command === 'status'){
      var status = {}
      if(message.jobId){
        ///get the status of a specific job
        status = worker.getStatusOfJob(message.jobId)
      } else {
        //get the status of all jobs and send it back
        status = worker.getStatus()
      }
      process.send(status)
      
    } else if(message.command === 'addJob'){
      if(typeof message.job.length === 'number'){
        message.job.forEach(function(job){
          jobQueue.push(job)
        })
      } else {
        jobQueue.push(message.job)
      }
      work()
    }
  }
})

work()