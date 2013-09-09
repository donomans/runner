"use strict";

function Worker(){
  this._jobs = []
  this.running = false
  this.cb = void 0
  
  var self = this
  
  this.runJob = function runJob(){
  if(self._jobs.length > 0){
    var job = self._jobs.shift()
    self.running = true
    var jobRunner = require('../' + job.jobPath)
    jobRunner.run(job.id, self.clearJob)
    setTimeout(runJob, 1000)
    } else {
      setTimeout(runJob, 1000 * 60 * 10)
    }
  }

  this.clearJob = function clearJob(err, result, jobId){
    if(err){
      //do something special?
    } 
    
    //do something with result
    self.cb(err, result, jobId)
  }
}
Worker.prototype = {
  /*
  * Run the actual job
  * -> call the jobCallback when 'done' (either through error or otherwise)
  * -> jobCallback should look like: function(err, result, jobId) {}
  */
  run: function run(jobs, jobCallback){
    if(jobCallback){
      this.cb = jobCallback
    } else {
      ///throw a fit... emit error?
    }
    
    //hmm - should i batch jobs together?
    // if i push the entire jobs object then i will have
    // an array (length will be undefined on all single jobs)
    // - i can tell which jobs are highly related?
    var self = this
    jobs.forEach(function(job){
      self._jobs.push(job)
    })///vs.
    //_jobs.push(jobs)
    
    setTimeout(this.runJob, 100)
  },
  /*
  * Add a job to the job queue
  */
  addJobs: function addJobs(jobs){
    var self = this
    jobs.forEach(function(job){
      self._jobs.push(job)
    })///vs.
    //_jobs.push(jobs)
  },
  
  /*
  * Current status of the job runner (true/false)
  */
  running: function(){
    return this.running
  }
}
module.exports = Worker
