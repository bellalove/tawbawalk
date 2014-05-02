// use this to define 'locals' to be used in your jade templates at
// template compile time (when gulp runs)

var moment = require('moment');

module.exports = function () {
  return {
    lastBuildDateLong: moment().format('MMMM Do YYYY, h:mm:ss a')
  }
};
