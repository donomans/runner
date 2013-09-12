"use strict";

var fs = require('fs')
var Job = require('./worker/job.js')

function Configuration(){
  var self = this
  
  this.config = {
    jobs: []
  }
  this._writeConfig = function _writeConfig(){
    //console.log(JSON.stringify(config))
    fs.writeFile('./runner/config.json', JSON.stringify(self.config), function (err){
      if(err){
        ///TODO: freak out on error
        console.log(err)
        throw err
      } else {
        //console.log('config saved to: ' + 'config.json')
      }
    })
  }
}



Configuration.prototype = { 
  loadConfig: function loadConfig(done){
    ///TODO: load config.json file if it exists and contains stuff
    var dirs
    var self = this
    fs.readdir('./jobs', function(err, files){
      if(err){
        console.log('loadConfig readdir error: ' + err)
        throw err
      } else {
        dirs = files
        
        dirs.forEach(function(file){
          var fileName,
              jobConfig,
              newJob
          
          if(file.indexOf('.js') !== -1){
            //var cleanName = file.substring(0, file.lastIndexOf('.'))
            fileName = '../jobs/' + file
            //console.log(fileName)
            jobConfig = new (require(fileName))().config
            jobConfig.jobPath = fileName
            //console.log(jobConfig)
            
          } else {
            fileName = '../jobs/' + file + '/' + file + '.json'
            jobConfig = require(fileName)
            jobConfig.jobPath = '../jobs/' + file + '/' + file
            //console.log(jobConfig)
          }
          if(self._canBeScheduled(jobConfig)){
            for(var i =0; i <500; i++){
              newJob = new Job(jobConfig)
              self.config.jobs.push(newJob)
            }
          }
        })
        //console.log(config)
        self._writeConfig()
        //console.log('checking done cb is type function: ' + (typeof done === 'function'))
        done(self.config)
      }
    })
  },
  /*
  * check the job frequency and confirm it has not passed and isn't invalid
  */
  _canBeScheduled: function canBeScheduled(config){
    if(config.frequency === 'immediate'){
      return true
    } else if(config.delayed && config.frequency === 'something valid'){
      ///TODO: determine the config.frequency patterns and 
      ///      if config.delayed should exist
      return true
    }
    ///TODO: change to false and figure this out
    return true
  }
}


module.exports = Configuration