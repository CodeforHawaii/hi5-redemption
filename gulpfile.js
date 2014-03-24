var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var flatten = require('gulp-flatten');
var jade = require('gulp-jade');
var livereload = require('gulp-livereload');
var browserify = require('gulp-browserify');
var path = require('path');
var server = require('./server.js')

gulp.task('dev-server', function() {
  server.createServer(3000);
});

gulp.task('bower', function() {
  gulp.src('app/bower_components/**/*.min.css')
      .pipe(flatten())
      .pipe(gulp.dest('dist/css'));

  gulp.src('app/bower_components/bootstrap/dist/fonts/*')
      .pipe(gulp.dest('dist/fonts'));
});

gulp.task('less', function() {
  gulp.src('app/stylesheets/*.less')
        .pipe(less({
            paths: [
                'app/bower_components/bootstrap/less'
            ]
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

gulp.task('js', function() {
  gulp.src('app/javascripts/app.js')
      .pipe(browserify({
        transform: ['reactify'],
        debug: true
      }))
      .pipe(gulp.dest('dist/js'))
      .pipe(livereload());
});

gulp.task('templates', function() {
  gulp.src('app/views/index.jade')
      .pipe(jade())
      .pipe(gulp.dest('dist/'))
      .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('app/stylesheets/**', ['less']);

  gulp.watch('app/javascripts/**', ['js']);

  gulp.watch('app/views/**', ['templates']);
});

gulp.task('default', ['dev-server', 'js', 'less', 'bower', 'watch', 'templates']);
