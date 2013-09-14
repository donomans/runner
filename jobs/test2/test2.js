"use strict";
function Test2(){
  this.workJob = new (require('workerJobs'))()
  
  //console.log('this ran before the job ran')
  
  this.workJob.job(function(promise){//id, cb){
    promise.then(function(promise, result){
      console.log(promise.config.id + ': second part of the task - this won\'t run until after the resolve')
      //console.log(result + '!')
      return result + '!'
    }).then(function(promise, result){
      console.log(promise.config.id + ': third part of the task - this won\'t run until after the resolve and second part')
      //console.log(result + '!')
      return result + '!'
    }).then(function(promise, result){
      console.log(promise.config.id + ': fourth part of the task - this won\'t run until after the resolve and third part')
      //console.log(result + '!')
    })
    
    setTimeout(function(){
      promise.resolve(function(){
        console.log(promise.config.id + ': this took 10 seconds or so to complete')
        return 'winner'
      })
    },10000)
    
    console.log(promise.config.id + ': ran the first part of the task: test2')
    
    //console.log(promise.config.id + ': this is the last line, but it will run before most')
  })
}
module.exports = Test2//workJob