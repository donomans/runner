"use strict";
var fs = require('fs')

var config = {};

///load config.json file if it exists and contains stuff



exports.loadConfig = function loadConfig(){
  var dirs = [] 
  fs.readdir('./jobs', function(err, files){
    if(err){
      console.log(err)
    } else {
      dirs = files
      
    }
  })
}

exports.config = config;