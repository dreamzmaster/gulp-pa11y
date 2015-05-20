/**
 */
'use strict';
var GraphiteSender = require('./lib/graphiteSender');

exports.task = function(result, config, cb) {
  if (config.graphiteHost) {

    var sender = new GraphiteSender(config.graphiteHost, config.graphitePort, config);
    sender.send(result, cb);

  } else {
    cb();
  }

};
