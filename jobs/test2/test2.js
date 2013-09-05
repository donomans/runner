"use strict";

console.log('woop woop')

module.exports.run = function(id, cb){
  console.log('ran the task: test2')
  cb(void 0, 'success', id)
}