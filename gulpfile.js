var gulp = require('gulp');
var webserver = require('gulp-webserver');
var inject = require('gulp-inject');
var print = require('gulp-print');
var filesort = require('gulp-angular-filesort');
var bowerFiles = require('gulp-main-bower-files');
var minifyHtml = require('gulp-minify-html');
var angularTemplatecache = require('gulp-angular-templatecache');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var sass = require('gulp-sass');
 

var config = {
    htmltemplates: './src/**/*.html',
    templateCache: {
        file: 'app.templates.js',
        options: {
            module: 'app',
            standAlone: false
        }
    },
    temp: './.tmp/'
};

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('build', ['copy-bower', 'copy-src', 'copy-assets', 'compile-sass', 'create-template-cache'], function () {
    var target = gulp.src('./src/app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var appSources = gulp.src(['./build/src/**/*.js', './build/app.templates.js']).pipe(filesort()).pipe(print());
  var bowerSources = gulp.src('./bower.json').pipe(bowerFiles()).pipe(print());
  var styleSources = gulp.src(['./build/styles/**/*']).pipe(print());

  return target
    .pipe(inject(appSources, {name: 'app'}))
    .pipe(inject(styleSources, {name: 'app'}))
    .pipe(inject(bowerSources, {name: 'bower'}))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    watch('./src/**/*', batch(function (events, done) {
        gulp.start('build', done);
    }));
});


gulp.task('copy-bower', function () {
    return gulp.src('./bower.json')
        .pipe(bowerFiles())
        .pipe(gulp.dest('./build/bower_components'));
});

gulp.task('copy-src', function () {
  return gulp.src(['./src/**/*.js'])
    .pipe(filesort())
    .pipe(gulp.dest('./build/src'));
});

gulp.task('copy-assets', function () {
return gulp.src('./src/assets/*')
    .pipe(gulp.dest('./build/assets'));
});

gulp.task('compile-sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./build/styles'));
});

gulp.task('create-template-cache', function () {
      return gulp
        .src(config.htmltemplates)
        .pipe(minifyHtml({empty: true}))
        .pipe(angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest('./build/'));
})