"use strict";

var fs = require('fs')
var Job = require('./worker/job.js')

var config = {
  jobs: []
};

///load config.json file if it exists and contains stuff

///done(config)
function loadConfig(done){
  var dirs
  fs.readdir('./jobs', function(err, files){
    if(err){
      console.log(err)
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
          jobConfig = require(fileName).config
          jobConfig.jobPath = fileName
          //console.log(jobConfig)
          
        } else {
          fileName = '../jobs/' + file + '/' + file + '.json'
          jobConfig = require(fileName)
          jobConfig.jobPath = '../jobs/' + file + '/' + file
          //console.log(jobConfig)
        }
        if(canBeScheduled(jobConfig)){
          newJob = new Job(jobConfig)
          config.jobs.push(newJob)
        }
      })
      //console.log(config)
      writeConfig()
      //done(config)
    }
  })
}
/*
* check the job frequency and confirm it has not passed and isn't invalid
*/
function canBeScheduled(config){
  return true
}

function writeConfig(){
  //console.log(JSON.stringify(config))
  fs.writeFile('./runner/config.json', JSON.stringify(config), function (err){
    if(err){
      ///freak out
      console.log(err)
      throw err
    } else {
      console.log('config saved to: ' + 'config.json')
    }
  })
}

module.exports.writeConfig = writeConfig
module.exports.loadConfig = loadConfig
module.exports.config = config;