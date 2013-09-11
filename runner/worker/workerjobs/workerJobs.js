"use strict";

var emitter = new (require('events').EventEmitter)()

/*
* WorkerJobs:
* -> emits: error, started, finished
* 
* WorkerJob is responsible for wrapping a task run with some emits and promises
*
*/
function WorkerJob(id, name){
  this.config = {
    jobName: name || '',
    jobId: id || void 0
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
  then: function then(continueFn){
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
      var result
      while(this.callbacks[0]){
        var cb = this.callbacks.shift()
        result = cb(result)
      }
      emitter.emit('finished', 'Finished the job (id: ' + 
                   this.config.jobId || id + 
                   ') at ' + new Date().toString())
      workerCb(void 0, 
               result || 'finished', 
               this.config.jobId || id)
    }
    catch(err){
      if(typeof this.failCb === 'function'){
        this.failCb(err)
      }
      emitter.emit('error', err)
      workerCb(err, 
               'an uncaught exception happened.', 
               this.config.jobId || id)
    }
  }
}

module.exports = WorkerJob