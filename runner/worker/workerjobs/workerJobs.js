"use strict";
/*
* workerJobs:
* -> emits: error, started, finished
* 
* workerJob is responsible for wrapping a task run with some emits
*
*/

var q = require("q")
var emitter = require('events').EventEmitter

function WorkerJob(id){
  this.config = {
    jobName: '',
    jobId: id
  }
  this.callbacks = []
  this.failCb = void 0
}
WorkerJob.prototype = {
  /*
  *
  * -> jobFn = function()
  * -> failFn = function(err)
  */
  job: function job(jobFn, jobFailFn){
    if(typeof jobFailFn == 'function'){
      this.failCb = jobFailFn 
    }
    this.callbacks.push(jobFn)
      
    return this
  },
  
  /*
  * continuation function that takes the result of 
  *  jobFn or the previous continueFn
  * -> continueFn = function(result)
  */
  then: function job(continueFn){
    this.callbacks.push(continueFn)
    return this
  },
  
  /*
  *
  */
  run: function run(id, workerCb){
    emitter.emit('started', 'Started the job, ' 
                 + this.config.jobName + '(id: ' + this.config.jobId + ')' +
                 ', at ' + new Date().toString())
    
    try{
      var result = this.jobCb()
      while(this.thenCbs[0]){
        var thencb = this.thenCbs.shift()
        result = thencb(result)
      }
      emitter.emit('finished', 'Finished the job (id: ' + this.config.jobId + ') at ' + new Date().toString())
      workerCb(void 0, result || 'finished', id)
    }
    catch(err){
      if(typeof this.failCb === 'function'){
        this.failCb(err)
      }
      emitter.emit('error', err)
      workerCb(err, 'an uncaught exception happened.', id)
    }
  }
}

module.exports = WorkerJob