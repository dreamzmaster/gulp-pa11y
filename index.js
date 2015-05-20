/*
 * gulp-pa11y
 * Released under the GNU GENERAL PUBLIC LICENSE
 */

'use strict';

var gulp = require('gulp'),
	pa11y = require('pa11y'),
	fs = require('fs'),
	path = require('path'),
	gutil = require('gulp-util'),
	assign = require('object-assign'),
	_ = require('underscore'),
	PluginError = gutil.PluginError;

require('colors');

var out = ' > '.cyan;

var gulpPa11y = function(options) {

	return function(cb) {

		gutil.log(gutil.colors.cyan('Accessibility Audit starts'));

		if (!options.url) {
			throw new PluginError('gulp-pa11y', 'Missing url option to Analyse');
		}

		var config = {
			reporter: 'console',
			failOnError: true,
			showFailedOnly: false
		};

		assign(config, options);

		if (config.showFailedOnly) {
			delete config.reporter;
		}

		pa11y.sniff(config, function(err, data) {

			if (err) {

				cb(new gutil.PluginError('gulp-pa11y', err + '\n\n'));

			} else if (data && !data.isPerfect) {

				if (config.showFailedOnly) {
					var groupedResults = _.groupBy(data.results, function(res) {
						return res.type;
					});

					_.each(groupedResults.error, function(res) {

						var code = res.code;
						var message = res.message.grey;
						var html = res.html;
						if (res.type === 'error') {
							code = code.red;
						}
						console.log(out + code);
						console.log('   ' + message);
						console.log('   ' + html);
					});

					console.log('[ERRORS]: '.red + data.count.error + '\n')
				}
				if (data.count.error > 0 && config.failOnError === true) {

					cb(new gutil.PluginError('gulp-pa11y', 'Build failed due to accessibility errors \n'.red));

				} else {
					//require('./tasks/sendToGraphite').task(data, config, cb);

					cb()
				}

			} else {
				require('./tasks/sendToGraphite').task(data, config, cb);
				cb();
			}
		})
	}

}

module.exports = gulpPa11y;