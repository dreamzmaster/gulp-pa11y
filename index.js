/*
 * gulp-pa11y
 * Released under the Apache 2.0 License
 */

'use strict';

var gulp = require('gulp'),
	pa11y = require('pa11y'),
	fs = require('fs'),
	path = require('path'),
	gutil = require('gulp-util'),
	assign = require('object-assign'),
	PluginError = gutil.PluginError;

var gulpPa11y = function(options) {

	return function(cb) {

		gutil.log(gutil.colors.cyan('Accessibility Audit starts'));

		if (!options.url) {
			throw new PluginError(PLUGIN_NAME, 'Missing url option to Analyse');
		}

		var config = {
				reportter: 'console',
	            failOnError: true
			};

		assign(config, options);

		pa11y.sniff(options, function(err, data){

			if (err) {
				
				cb(new gutil.PluginError('gulp-pa11y', err + '\n\n'));

			} else if(data && !data.isPerfect) {
				
				if( data.count.error > 0 && config.failOnError === true) {

					cb(new gutil.PluginError('gulp-pa11y', data.count.error + ' Accessibility Errors \n\t BUILD FAILED \n'.red));

				} else {
					cb()
				}

			} else {
				cb();
			}
		})
	}

}

module.exports = gulpPa11y;