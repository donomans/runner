"use strict";
/**
 * main file to start server and scheduler and get configuration
 */

var router = require('./site/routes').route
var handler = require('./site/handlers').handles
require('./site/server').start(router, handler)

var scheduler = new (require('./runner/scheduler'))()

var configuration = new (require('./runner/config'))()

configuration.loadConfig(function(config){
  //console.log('loadConfig cb: ')
  //console.log(config)
  scheduler.startWorkers(config);
});
