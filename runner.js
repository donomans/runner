"use strict";
/**
 * main file to start server and scheduler and get configuration
 */


var router = require('./routes').route;
var handler = require('./handlers').handles;
require('./server').start(router, handler);

var scheduler = require('./scheduler');

require('./config').loadConfig(function(config){
  scheduler.start(config);
});
