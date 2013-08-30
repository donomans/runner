"use strict";
/**
 * main file to start server and scheduler and get configuration
 */


var router = require('./routes').Route;
var handler = require('./handlers').Handles;
require('./server').Start(router, handler);

var scheduler = require('./scheduler');
var config = require('./config');

//scheduler.Start(config);