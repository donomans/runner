"use strict";

var _jobs = []
var running = false
var cb = void 0
//Array.prototype.findJob = function(jobId){
//}
/*
*
*/
exports.run = function run(jobs, jobCallback){
  if(jobCallback){
    cb = jobCallback
  } else {
    ///throw a fit...
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
*
*/
exports.addJobs = function addJobs(jobs){
  jobs.forEach(function(job){
    _jobs.push(job)
  })///vs.
  //_jobs.push(jobs)
}

exports.running = running

function runJob(){
  if(_jobs[0]){
    var job = _jobs[0]
    running = true
    jobRunner = require('../../jobs/' + _jobs[0].name)
    jobRunner.run(job.config, clearJob)
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
  
  //remove the job from the _jobs array
  
  
}