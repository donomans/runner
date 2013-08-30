"use strict";

exports.start = function(route, handler){
  var http = require('http');
  var url = require('url');
  ///do somethin with the router... replace connect
  
  http.createServer(function(request, response){
    var urlPath = url.parse(request.url)
    
    route(urlPath.pathname.toLowerCase(), handler, response)//urlPath.pathname, urlPath.query)
    
  }).listen('8080','localhost');
};

