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
      if(message.jobId){
        ///get the status of a specific job
        var status = worker.getStatusOfJob(message.jobId)
        process.send(status)
      } else {
        //get the status of all jobs and send it back
        process.send({ 
          from: 'immediate',
          status: 'doing great.',
          jobStatuses: [
            {
              jobId: 1234,
              status: 'boourns',
              name: 'dumbjob'
            },
            {
              jobId: 1235,
              status: 'yay',
              name: 'moveFiles'
            }
          ]
        })
      }
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