"use strict";

exports.Route = function(path, handler, writer){
  if(typeof handler[path] === 'function'){
    handler[path](path, writer);
  } else if(handler.Default && typeof handler.Default === 'function') {
    handler.Default(path, writer);
  } else {
    console.log('no Default, and no handler for this path: ' + path);
  }
};