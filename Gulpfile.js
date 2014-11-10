'use strict';


var gulp = require('gulp');
var gutil = require('gulp-util');

// Server dependencies
var server = require('gulp-develop-server');
var livereload = require('gulp-livereload');

// Client script dependencies
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var react = require('gulp-react');
var rename = require('gulp-rename');
var source = require("vinyl-source-stream");

var production = process.env.NODE_ENV === 'production';

var bases = {
	app: './app'
};

var paths = {
	scripts: ['./app/lib/*.js', './app/main.js'],
	react: ['./app/src/js/**/*.jsx'],
	styles: ['./app/public/**/*.css'],
	templates: ['./app/views/*.hbs', './app/layouts/*.hbs']
};

var opts = {
	path: './app/main.js',
	execArgv: ['--harmony']
};

gulp.task('serve', function() {
	gulp.src('./main.js', { cwd: bases.app })
		.pipe(server(opts), { cwd: bases.app })
		.pipe(livereload());
});

var scripts = function(watch) {
	var bundler, rebundle;
	bundler = browserify({
		basedir: __dirname,
		debug: !production,
		entries: "./app/src/js/main.jsx",
		cache: {}, // required for watchify
		packageCache: {},  // required for watchify
		fullPaths: watch
	});

	if (watch) {
		bundler = watchify(bundler);
	}

	bundler.transform(reactify);

	rebundle = function () {
		return bundler.bundle()
			.on("error", function(err) {
				gutil.log(gutil.colors.red( "Browserify error: " +  err.message));
			})
			.pipe(source("main.jsx"))
			.pipe(rename("main.js"))
			.pipe(gulp.dest("./app/public/dist"))
			.pipe(livereload());
	};

	bundler.on("time", function(time) {
		gutil.log("Bundle compiled after", gutil.colors.magenta(time + ' ms'));
	});

	bundler.on('update', rebundle);

	return rebundle();
};

gulp.task('watch', function() {
	var s = livereload();

	gulp.watch(paths.scripts, ['serve']);
	gulp.watch(paths.styles, s.changed);
	gulp.watch(paths.templates, s.changed);

	return scripts(true);
});

gulp.task('browserify', function(){
	return scripts(false);
});

gulp.task('default', ['serve', 'watch']);
