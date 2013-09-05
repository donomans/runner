"use strict";
/*
* Job class 
*/
var crypto = require('crypto')
/* Create a new job */
function Job(config) {
  //console.log('config: ' + config)
  this.jobName = config.jobName
  this.frequency = config.frequency
  this.id = crypto.randomBytes(20).toString('hex'); 
  this.config = config ///the config from the job file?
}

Job.prototype.Something = function(){}

module.exports = Job