"use strict";

function Promise(){
  this.promise = this
  this.data = void 0
  this.resolved = false
}

Promise.prototype = {
  resolve: function(val){
    if(val){
      if(typeof val === 'function'){
        this.data = val()
      } else {
        this.data = val
      }
    }
    this.resolve = true
  },
  
  defer: function(){
    
  }
}

module.exports = Promise