"use strict";

/*
* -> start the immediateWorker and longWorkers in a child_process
* -> take the config and pass on the jobs to each of them
* -> exports:
*     startWorkers
*     workerStatus? -> poll the child processes for 
*/

var fork = require('child_process').fork;
var immediate = void 0;
var delayed = void 0;
var delayedJobsCb = void 0;
var immediateJobsCb = void 0;
var mintimer = 1000 * 60 //60 seconds

/*
* fire off the child processes for immediate and delayed job runners
*/
exports.startWorkers = function (config){
  immediate = fork('./worker/immediateWorker.js')
  delayed = fork('./worker/delayedWorker.js')
}

/*
* callback with the status of the jobs and the run orders of the jobs
* for immediate and delayed job tasks
* -> callbacks only need to be set one time
*    if left blank they will not overwrite
*/
exports.getStatus = function(delayedJobsCallback, immediateJobsCallback){
  if(delayedJobsCallback){
    delayedJobsCb = delayedJobsCallback
  }
  if(immediateJobsCallback){
    immediateJobsCb = immediateJobsCallback
  }
  process.on('message', function(data){
    console.log(data);
    if(delayedJobsCb){
      delayedJobsCb(data)
    }
    if(immediateJobsCb){
      immediateJobsCb(data)
    }
  })
  immediate.send({
    command: 'status'
  })
  delayed.send({
    command: 'status'
  })
}


/*
* add job to the right job runner based the job's info
*/
exports.addJob = function(job){
  if(job.delayed){
    _addJobDelayed(job)
  } else {
    _addJobImmediate(job)
  }
}

/*
* send job to delayedWorker child_process
*/
function _addJobDelayed(job){
  _addJob(delayed, job)
}
/*
* send job to immediateWorker child_process
*/
function _addJobImmediate(job){
  _addJob(immediate, job)
}

function __addJob(worker, job){
  if(worker){
    worker.send({
      command: 'addJob',
      job: job
    })
  }
}

//
//var jobs = { 
//  jobQueue: [],
//  find: function(){
//    ///find the next job
//  }
//}
//
//
//
//function next(){
//  ///find the next job
//  return jobs.find()
//};
//
//exports.start = function (config){
//  ///load config into jobs
//  
//  setTimeout(function() {
//    start()
//  }, 0);
//};
//
//function start(){
//  setTimeout(function findJobs(){
//    ///start the work of finding all the jobs and organize them
//    
//    setTimeout(function startJobs(){
//      //start the first job, potentially
//      var job = next()
//      //do job
//      if(job){
//      
//      } else {
//        setTimeout(startJobs, mintimer)
//      }
//    }, 10);
//  }, 10);
//};

