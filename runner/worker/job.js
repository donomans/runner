"use strict";

var crypto = require('crypto')

/* Job class: 
* Create a new job 
*/
function Job(config) {
  //console.log('config: ' + config)
  this.jobName = config.jobName
  /// if its missing/blank or 0, then it's automatically immediate
  this.frequency = config.frequency || 'immediate'
  //this.delayed = config.delayed || !(this.frequencey === 'immediate')
  this.recur = config.recur || (this.frequency === 'immediate' ? false : true)
  ///the config from the job file, as is - for posterity
  ///may be unused things that may be useful outside of standard configuration?
  this.config = config 
  
  this.jobPath = config.jobPath
  
  this.retry = config.retry || false
  
  //ex: {
  //   endpoint: 'http://someapiurl',
  //   verb: 'get',
  //   content: '' //optional 
  // }
  this.curl  = config.curl || {} 
  
  ///maybe this should be the hash of the 
  /// jobName + jobPath + JSON.stringify(config)?
  /// -> Can then check for duplicates and load old config?
  this.id = config.jobId || crypto.randomBytes(20).toString('hex'); 
}

module.exports = Job