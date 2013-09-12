"use strict";

function Promise(jobConfig) {
  var self = this
  this.pending = []
  //this.complete = false
  this.resolve = function(result) {
    self.run('resolve', result)
  }

  this.reject = function(result) {
    self.run('reject', result)
  }
  
  this.config = jobConfig
}

Promise.prototype = {
  then: function(cont, fail) {
    this.pending.push({ resolve: cont, reject: fail })
    return this
  },
//  done: function(){
//    this.complete = true
//  },
  run: function(type, result) {
    var r
    if(typeof result === 'function'){
      r = result()
    } else {
      r = result
    }
    while (this.pending[0]) {
      r = this.pending.shift()[type](this, r)
    }
  }
}

//
//function Promise(){
//  this.promise = this
//  this.data = void 0
//  this.resolved = false
//}
//
//Promise.prototype = {
//  resolve: function(val){
//    if(val){
//      if(typeof val === 'function'){
//        this.data = val()
//      } else {
//        this.data = val
//      }
//    }
//    this.resolve = true
//  },
//  
//  defer: function(){
//    
//  }
//}

module.exports = Promise