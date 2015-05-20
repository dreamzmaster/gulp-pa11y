/**
 * gulp-pa11y
 * Released under the GNU GENERAL PUBLIC LICENSE
 */
'use strict';
var winston = require('winston'),
  net = require('net');

function GraphiteSender(host, port, config) {
  this.host = host;
  this.port = port;
  this.config = config;
  this.log = winston.loggers.get('sitespeed.io');
}

GraphiteSender.prototype.send = function(data, cb) {

  var self = this;

  this.log.verbose('Send the following keys to Graphite:', data);

  var server = net.createConnection(this.port, this.host);
  server.addListener('error', function(connectionException) {
    self.log.log('error', 'Couldn\'t send data to Graphite:' + connectionException + ' for host:' + self.host +
      ' port:' +
      self.port);
      cb();
  });

  server.on('connect', function() {
    self.log.log('info', 'Sending data to Graphite host:' + self.host + ' port:' + self.port);
    this.write(data);
    this.end();
    cb();
  });

};


module.exports = GraphiteSender;
