"use strict";
/*
* Job class 
*/

var crypto = require('crypto')
/* Create a new job */
function Job(config) {
  //console.log('config: ' + config)
  this.jobName = config.jobName
  // if its missing/blank or 0, then it's automatically immediate
  this.frequency = config.frequency || 'immediate'  
  ///maybe this should be the hash of the jobName + jobPath + JSON.stringify(config)?
  ///Can then check for duplicates and load old config
  this.id = crypto.randomBytes(20).toString('hex'); 
  this.config = config ///the config from the job file, as is
  this.jobPath = config.jobPath
  this.retry = config.retry || false
}

Job.prototype.Something = function(){}

module.exports = Job