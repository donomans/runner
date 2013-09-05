"use strict";

var _jobs = []
var running = false
var cb = void 0
//Array.prototype.findJob = function(jobId){
//}

/*
* Run the actual job
* -> call the jobCallback when 'done' (either through error or otherwise)
* -> jobCallback should look like: function(err, result, jobId) {}
*/
module.exports.run = function run(jobs, jobCallback){
  if(jobCallback){
    cb = jobCallback
  } else {
    ///throw a fit... emit error?
  }
  
  //hmm - should i batch jobs together?
  // if i push the entire jobs object then i will have
  // an array (length will be undefined on all single jobs)
  // - i can tell which jobs are highly related?
  
  jobs.forEach(function(job){
    _jobs.push(job)
  })///vs.
  //_jobs.push(jobs)
  
  setTimeout(runJob, 100)
}
/*
* Add a job to the job queue
*/
module.exports.addJobs = function addJobs(jobs){
  jobs.forEach(function(job){
    _jobs.push(job)
  })///vs.
  //_jobs.push(jobs)
}

/*
* Current status of the job runner (true/false)
*/
module.exports.running = running

function runJob(){
  if(_jobs.length > 0){
    var job = _jobs.shift()
    running = true
    var jobRunner = require('../../jobs/' + job.jobPath)
    jobRunner.run(job.id, clearJob)
    setTimeout(runJob, 1000)
  } else {
    setTimeout(runJob, 1000 * 60 * 10)
  }
  
}

function clearJob(err, result, jobId){
  if(err){
    //put job in distress status using jobCallback
  } 
  
  //do something with result
  cb(err, result, jobId)
}