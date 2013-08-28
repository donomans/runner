/**
 * main file to start server and
 */

var config = {};


var connect = require('connect')
var http = require('http')

var connect = require('connect'), http = require('http');

var app = connect()
    .use(connect.favicon())
    .use(connect.logger('dev'))
    .use(connect.static('site'))
    .use(connect.directory('site'))
    .use(connect.cookieParser());

http.createServer(app).listen('8080','localhost');




setTimeout(1, function(){
  ///start the work of finding all the jobs and organize them
  
  
  setTimeout(1, function(){
    //start it the first job, potentially
  });
});