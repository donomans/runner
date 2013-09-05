"use strict";

var config = {
  /* add configuration here for a test task/job */
  jobName: 'test',
  frequency: 'immediate'
}

module.exports.config = config

/// this is a test task/job
module.exports.run = function(id, cb) {
  ///Run the task
  console.log('ran the test job')
  cb(void 0, 'success', id)
}