"use strict";
/**
 * main file to start server and scheduler and get configuration
 */

var router = require('./site/routes').route;
var handler = require('./site/handlers').handles;
require('./site/server').start(router, handler);

var scheduler = require('./runner/scheduler');

require('./runner/config').loadConfig(function(config){
  scheduler.start(config);
});
