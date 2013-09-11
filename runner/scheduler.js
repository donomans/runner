"use strict";

var fork = require('child_process').fork;
/*
* -> start the immediateWorker and longWorkers in a child_process
* -> take the config and pass on the jobs to each of them
* -> exports:
*     startWorkers
*     workerStatus? -> poll the child processes for 
*/
function Scheduler(){
  this.immediate = void 0;
  this.delayed = void 0;
  this.delayedJobsCb = void 0;
  this.immediateJobsCb = void 0;
  this.mintimer = 1000 * 60 //60 seconds
}

Scheduler.prototype = {
  /*
  * fire off the child processes for immediate and delayed job runners
  */
  startWorkers: function (config){
    ///parse the config for jobs that should go to immediate and ones for delayed
    var jobs = this._parseJobs(config)
    this.immediate = fork('./runner/worker/immediateWorker.js', [JSON.stringify(jobs.immediate)])
    this.delayed = fork('./runner/worker/delayedWorker.js', [JSON.stringify(jobs.delayed)])
    console.log('startWorkers forks started')
  },
  _parseJobs: function(config){
    var immediatejobs = []
    var delayedjobs = []
    config.jobs.forEach(function(job){
      if(job.frequency === 'immediate'){
        immediatejobs.push(job)
      } else {
        delayedjobs.push(job)
      }
    })
    console.log('immediate jobs parsed: ')
    console.log(immediatejobs)
    console.log('delayed jobs parsed: ')
    console.log(delayedjobs)
    return { immediate: immediatejobs, delayed: delayedjobs }
  },
  /*
  * callback with the status of the jobs and the run orders of the jobs
  * for immediate and delayed job tasks
  * -> callbacks only need to be set one time
  *    if left blank they will not overwrite
  */
  getStatusOfDelayedJobs: function(delayedJobsCallback){
    var self = this
    if(delayedJobsCallback){
      this.delayedJobsCb = delayedJobsCallback
    }
    ///TODO: need to wrap this in a 'run once' and curried
    process.on('message', function(data){
      console.log(data);
      if(data.from === 'immediate'){
        if(self.immediateJobsCb){
          self.immediateJobsCb(data)
        }
      }
      if(data.from === 'delayed'){
        if(self.delayedJobsCb){
          self.delayedJobsCb(data)
        }
      }
    })
    
    this.delayed.send({
      command: 'status'
    })
  },

  getStatusOfImmediateJobs: function(immediateJobsCallback){
    var self = this
    if(immediateJobsCallback){
      this.immediateJobsCb = immediateJobsCallback
    }
    ///TODO: need to wrap this in a 'run once' and curried
    process.on('message', function(data){
      if(data.from)
      console.log(data);
      if(data.from === 'immediate'){
        if(self.immediateJobsCb){
          self.immediateJobsCb(data)
        }
      }
      if(data.from === 'delayed'){
        if(self.delayedJobsCb){
          self.delayedJobsCb(data)
        }
      }
    })
    this.immediate.send({
      command: 'status'
    })
  },

  /*
  * add job to the right job runner based the job's info
  */
  addJob: function(job){
    ///TODO: job.delayed?  is that right?
    if(job.frequency === 'immediate'){
      this._addJobImmediate(job)
    } else {
      this._addJobDelayed(job)
    }
  },
  
  /*
  * send job to delayedWorker child_process
  */
  _addJobDelayed: function _addJobDelayed(job){
    this.__addJob(this.delayed, job)
  },
  /*
  * send job to immediateWorker child_process
  */
  _addJobImmediate: function _addJobImmediate(job){
    this.__addJob(this.immediate, job)
  },
  
  __addJob: function __addJob(worker, job){
    if(worker){
      worker.send({
        command: 'addJob',
        job: JSON.stringify(job)
      })
    }
  }
}

module.exports = Scheduler