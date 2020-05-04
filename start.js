const { exec } = require("child_process");

module.exports = function start(cb){
  exec("npm start");
  cb();
}
