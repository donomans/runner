Array.prototype.reduce = function(callback, resultArr){
  resultArr = resultArr || []
  this.forEach(function(val){
    if(callback(val)){
      resultArr.push(val)
    }
  })
  return resultArr
}

Number.prototype.do = function(callback){
  for(var x = 0; x < this; x++){
    callback(x)
  }
}

module.exports = {
  config: {
  }
}