/**
 * gulp-pa11y
 */
'use strict';

var gulp 		= require('gulp'),
	pa11y = require('./index.js');

gulp.task('build', pa11y({
	url: 'http://www.marksandspencer.com',
	failOnError: true, // fail tje build on error
	showFailedOnly: true, // show errors only and override reporter
	reporter: 'console'
}));