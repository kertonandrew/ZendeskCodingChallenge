// Load plugins
var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	del = require('del');

// Styles
gulp.task('styles', function() {
	return gulp.src('client/src/styles/**/*.css')
		.pipe(concat('styles.css'))
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest('client/dist/styles'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cssnano())
		.pipe(gulp.dest('client/dist/styles'))
		.pipe(notify({
			message: 'Styles task complete'
		}));
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src('client/src/scripts/**/*.js')
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('client/dist/scripts'))
		.pipe(rename({
			suffix: '.min'
		}))
		// .pipe(uglify({
		// 	mangle: false
		// }))
		.pipe(gulp.dest('client/dist/scripts'))
		.pipe(notify({
			message: 'Scripts task complete'
		}));
});

// Images
gulp.task('images', function() {
	return gulp.src('client/src/images/**/*')
		.pipe(cache(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest('client/dist/images'))
		.pipe(notify({
			message: 'Images task complete'
		}));
});

// Views
gulp.task('views', function() {
	return gulp.src('client/src/views/**/*.html')
		.pipe(gulp.dest('client/dist/views/'))
		.pipe(notify({
			message: 'Views task complete'
		}));
});

// Clean
gulp.task('clean', function() {
	return del(['client/dist/styles', 'client/dist/scripts', 'client/dist/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'scripts', 'images', 'views');
});

// Watch
gulp.task('watch', function() {
	gulp.start('default');
	gulp.watch('client/src/styles/**/*.css', ['styles']);
	gulp.watch('client/src/scripts/**/*.js', ['scripts']);
	gulp.watch('client/src/images/**/*', ['images']);
	gulp.watch('client/src/views/**/*', ['views']);
});