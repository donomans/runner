"use strict";

function Worker(){
  this._jobs = []
  this._runJobs = []
  this.running = false
  this.cb = void 0
  
  var self = this
  
  this.runJob = function runJob(){
  if(self._jobs.length > 0){
    var jobConfig = self._jobs.shift()
    this._runJobs.push(jobConfig)
    self.running = true
    jobConfig.running = true
    jobConfig.startedTime = new Date().toString()
    var jobRunner = require('../' + jobConfig.job.jobPath)
    jobRunner.run(jobConfig.job.id, self.clearJob)
    setTimeout(runJob, 1000)
    } else {
      setTimeout(runJob, 1000 * 60 * 10)
    }
  }

  this.clearJob = function clearJob(err, result, jobId){
    if(err){
      //do something special?
    } 
    ///what if i don't find it, for some reason?
    var found = false
    this._runJobs.forEach(function(jobConfig){
      if(jobConfig.job.id === jobId){
        jobConfig.running = false
        jobConfig.err = err
        jobConfig.result = result
        jobConfig.stoppedTime = new Date().toString()
        found = true
      }
    })
    if(!found){
      //freak out.
    }
    self.running = false
    //do something with result
    self.cb(err, result, jobId)
  }
}
Worker.prototype = {
  /*
  * Run the actual job
  * -> call the jobCallback when 'done' (either through error or otherwise)
  * -> jobCallback should look like: function(err, result, jobId) {}
  *
  * -> jobs is an array of Job objects
  */
  run: function run(jobs, jobCallback){
    if(jobCallback){
      this.cb = jobCallback
    } else {
      ///throw a fit... emit error?
    }

    var self = this
    jobs = jobs || []
    jobs.forEach(function(job){
      self._jobs.push({ 
        job: job, 
        running: false, 
        err: false, 
        finished: false,
        result: false
      })
    })
    
    setTimeout(this.runJob, 100)
  },
  /*
  * Add a job to the job queue
  * -> jobs is an array of Job objects
  */
  addJobs: function addJobs(jobs){
    var self = this
    jobs = jobs || []
    jobs.forEach(function(job){
      self._jobs.push({ 
        job: job, 
        running: false, 
        err: false, 
        finished: false,
        result: false
      })
    })
  },
  
  // /*
  // * Current status of the job runner (true/false)
  // */
  // running: function(){
  //   return this.running
  // }
  getStatus: function getStatus(jobId){
    ///runner needs to manage status of jobs - multiple could be running
    var status = void 0
    
    this._runJobs.forEach(function(jobConfig){
      if(jobConfig.job.id === jobId){
        status = jobConfig
      }
    })
    if(status !== void 0){
      return status
    } else {
      this._jobs.forEach(function(jobConfig){
        if(jobConfig.job.id === jobId){
          status = jobConfig
        }
      })
      return status
    }
  }
}
module.exports = Worker
