/* eslint-disable */
"use strict";

var gulp = require('gulp');
var apidoc = require('gulp-apidoc');
// var del = require('del');
const rimraf = require('rimraf');
gulp.task('clean', () =>
	// del(['dist/**'])
	rimraf('./dist/*', function () { console.log('done'); })
);

/*Api doc*/
gulp.task('delete-doc', () =>
	// del(['doc/**'])
	rimraf('./doc/*', function () { console.log('done'); })
);

/** 
 * API document
 */
gulp.task('apidoc', function (done) {
	apidoc({
		src: "routes/api/",
		dest: "public/api-document/",
		debug: true,
		includeFilters: [".*\\.js$"]
	}, done)
});

/** Realtime document */
gulp.task('rtdoc', function (done) {
	apidoc({
		src: "routes/realtime",
		dest: "public/realtime-document/",
		debug: true,
		includeFilters: [".*\\.js$"]
	}, done)
});

