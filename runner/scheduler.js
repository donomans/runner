"use strict";

var mintimer = 1000 * 60

var jobs = { 
      find: function(){
      ///find the next job
    }
  }



function next(){
  ///find the next job
  return jobs.find()
};

exports.start = function (config){
  ///load config into jobs
  
  setTimeout(function() {
    start()
  }, 0);
};

function start(){
  setTimeout(function findJobs(){
    ///start the work of finding all the jobs and organize them
    
    setTimeout(function startJobs(){
      //start the first job, potentially
      var job = next()
      //do job
      if(job){
      
      } else {
        setTimeout(startJobs, mintimer)
      }
    }, 10);
  }, 10);
};

