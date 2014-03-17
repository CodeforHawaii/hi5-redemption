var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var flatten = require('gulp-flatten');
var jade = require('gulp-jade');
var livereload = require('gulp-livereload');
var path = require('path');
var server = require('./server.js')

gulp.task('dev-server', function() {
  server.createServer(3000);
});

gulp.task('less', function() {
  gulp.src('app/stylesheets/*.less')
      .pipe(less({
          paths: [
              'bower_components/bootstrap/less'
          ]
      }))
      .pipe(gulp.dest('public/css'))
      .pipe(livereload());

  gulp.src('bower_components/**/*.min.css')
      .pipe(flatten())
      .pipe(gulp.dest('public/css'));

  gulp.src('bower_components/bootstrap/dist/fonts/*')
      .pipe(gulp.dest('public/fonts'));
});

gulp.task('js', function() {
  var externalFiles = [];

  gulp.src('app/js/**')
      .pipe(gulp.dest('public/js'))
      .pipe(livereload());

  gulp.src(externalFiles)
      .pipe(flatten())
      .pipe(gulp.dest('public/js'))
      .pipe(livereload());
});

gulp.task('templates', function() {
  gulp.src('app/views/**/*.jade')
      .pipe(jade())
      .pipe(gulp.dest('public/'))
      .pipe(livereload());
});

gulp.task('development', function() {
  gulp.run('dev-server', 'less', 'js', 'templates');

  gulp.watch('app/stylesheets/**', function() {
    gulp.run('less');
  });

  gulp.watch('app/js/**', function() {
    gulp.run('js');
  });

  gulp.watch('app/views/**', function() {
    gulp.run('templates');
  });
});
