"use strict";

exports.Start = function(route, handler){
  var http = require('http');
  var url = require('url');
  ///do somethin with the router... replace connect
  
  http.createServer(function(request, response){
    var urlPath = url.parse(request.url)
    
    response.writeHead(200, {'Content-Type': 'text/plain'})
    route(urlPath.pathname.toLowerCase(), handler, function(val){
      response.write(val)
    })//urlPath.pathname, urlPath.query)
    
    response.end();
  }).listen('8080','localhost');
};

