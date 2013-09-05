"use strict";

function index(path, response){
  response.write('did Index.')
  console.log('path: ' + path)
};

function active(path, response){
  response.write('did Active.')
  console.log('path: ' + path)
};

function favicon(path, response){
  
};

function catchAll(path, response){
  response.write('did Default.')
  Index(path, response)
}

module.exports.handles = {
  '/': index
  , '/index': index
  , '/active': active
  , '/favicon.ico': favicon
  , Default: catchAll
}