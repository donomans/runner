/*
* Job class 
*/

/* Create a new job */
function Job(name, frequency) {
    this.name = name
    this.frequency = frequency
    this.id = 65473657493 ///generate some id?
    this.config = {} ///the config from the job file?
}

//Job.prototype.

exports.Create = function(name, frequency){
  return new Job(name, frequency)
}