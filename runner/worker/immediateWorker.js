"use strict";
var worker = new (require('./worker.js'))()

var jobQueue = JSON.parse(process.argv[2])
///load in args that the scheduler passed along?
//console.log('immediateWorker started')
//console.log(JSON.parse(process.argv[2]))

/*
* Use worker to run the jobs this process has been handed
*/
function work(){
  if(worker && !worker.running){
    worker.run(jobQueue, jobResult)
  } else {
    worker.addJobs(jobQueue)
  }
  jobQueue = []
  setTimeout(work, 5 * 1000)
}

function jobResult(err, result, jobId){
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