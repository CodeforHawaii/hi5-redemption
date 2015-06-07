'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var karma = require('karma');


// Start BrowserSync Server
gulp.task('browser-sync', function() {
  browserSync.init([
    './build/css/*.css',
    './build/js/**/*.js',
    './**/*.html'
  ],
  {
    notify: false,
    server: {
      baseDir: ['./']
    },
    port: 3500,
    browser: [],
    tunnel: false
  });
});


// Compile JSX
gulp.task('js', function() {
  return gulp.src('src/**/*.js')
    .pipe(plugins.cached('js'))
    .pipe(gulp.dest('build/'));
});


// Compile Sass
gulp.task('sass', function() {
  return gulp.src('src/sass/main.scss')
    .pipe(plugin.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.sourcemaps.write({includeConcent: false}))
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions']
    }))
    .on('error', plugins.util.log)
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'))
    .on('error', plugins.util.log);
});


// Serve
gulp.task('serve', ['browser-sync', 'js', 'sass'], function() {
  plugins.watch('src/sass/**/*.scss', {name: 'SASS'}, function() {
    gulp.start('sass');
  });

  plugins.watch('src/js/**/*.js', {name: 'JS'}, function() {
    gulp.start('js')
  });
});


// Clean
gulp.task('clean', function() {
  rimraf('build', function(err) {
    plugins.util.log(err);
  });
});


// Build (no server)
gulp.task('build', ['js', 'sass']);


// Default
gulp.task('default', ['serve']);


// Tests
gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});


// Distribution tasks
//=================================

// Clean Dist folder
gulp.task('dist-clean', function() {
  rimraf('./dist', function(err) {
    plugins.util.log(err);
  });
});


// CSS
gulp.task('dist-css', function() {
  return gulp.src('./build/css/main.css')
    .pipe(gulp.dest('./dist/css'))
    .pipe(plugins.csso())
    .pipe(plugins.rename('main.min.css'))
    .pipe(gulp.dest('./dist/css'))
    .on('error', plugins.util.log);
});


// Copy index.html to dist
gulp.task('html', function() {
  gulp.src(['./index.html'])
    .pipe(gulp.dest('./dist'))
    .on('error', plugins.util.log);
});


// Bundle with jspm
gulp.task('bundle', ['js'], plugins.shell.task([
  'jspm bundle-sfx build/js/main.js!jsx dist/js/app.js'
]));


// Uglify bundle
gulp.task('uglify', function() {
  return gulp.src('./dist/js/app.js')
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(plugins.rename('app.min.js'))
    .pipe(gulp.dest('./dist/js'))
    .on('error', plugins.util.log);
});


//Create distribution
gulp.task('dist', function() {
  runSequence(
    'delete-dist',
    'build',
    ['css', 'html', 'bundle']
    'uglify'
  );
});
