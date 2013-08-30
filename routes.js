"use strict";

exports.route = function(path, handler, response){
  if(typeof handler[path] === 'function'){
    response.writeHead(200, {'Content-Type': 'text/plain'})
    handler[path](path, response);
  } else if(handler.Default && typeof handler.Default === 'function') {
    response.writeHead(200, {'Content-Type': 'text/plain'})
    handler.Default(path, response);
  } else {
    response.writeHead(404, {'Content-Type': 'text/plain'})
    response.write('404 Not found')
    console.log('no Default, and no handler for this path: ' + path);
  }
   response.end();
};