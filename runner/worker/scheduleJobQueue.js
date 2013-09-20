"use strict";

var later = require('later')

/*
*
*/
function ScheduleJobQueue(){
  this.queue = []
}

/*
* Add some [jobs] to the scheduling queue
*/
ScheduleJobQueue.prototype.add = function(jobs){
  if(Array.isArray(jobs)){
    var self = this
    jobs.forEach(function(item){
      self.queue.push(item)
    })
  } else{
    if(jobs){
      
    } else {
      ///TODO: throw a fit if arg is nothing
    }
  }
}

/*
* Calculate the next [count] number from the existing schedules
*/
ScheduleJobQueue.prototype.next = function(count){
  count = count || 10
  
}

/*
* Grab the next jobs worth scheduling in the next [ms]
*/
ScheduleJobQueue.prototype.take = function(ms){
  
}

module.exports = ScheduleJobQueue