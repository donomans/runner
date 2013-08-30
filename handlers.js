"use strict";

function Index(path, writer){
  writer('did Index.')
  console.log(path)
};

function Active(path, writer){
  writer('did Active')
  console.log(path)
};

function Favicon(path, writer){
};

function Default(path, writer){
  writer('did Default.')
  Index(path, writer)
}

exports.Handles = {
  '/': Index
  , '/index': Index
  , '/active': Active
  , '/favicon.ico': Favicon
  , Default: Default
}