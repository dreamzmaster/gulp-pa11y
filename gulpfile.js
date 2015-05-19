/**
 * gulp-pa11y
 */
'use strict';

var gulp 		= require('gulp'),
	pa11y = require('./index.js');

gulp.task('build', pa11y({
	url: 'http://0.0.0.0:8000/hub',
	reporter: 'console',
	failOnError: false
}));