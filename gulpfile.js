// Libraries
var gulp = require('gulp'),
  fs = require('fs'),
  sass = require('gulp-sass'),
  imagemin = require('gulp-imagemin'),
  responsive = require('gulp-responsive'),
  ejs = require("gulp-ejs"),
  imageminWebp = require('imagemin-webp'),
  ghPages = require('gulp-gh-pages');

// Compile views
gulp.task('views', function() {
  return gulp.src('views/*.ejs')
    .pipe(ejs({}, {}, { ext: '.html' }))
    .pipe(gulp.dest('./dist'));
});

// Compile CSS
gulp.task('sass', function () {
  return gulp.src('./sass/index.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

// Optimize svg
gulp.task('svg', function() {
  return gulp.src('./images/*.svg')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
});

// Optimize Images
gulp.task('jpg', function() {
  return gulp.src('./images/*.jpg')
    .pipe(responsive({
      '*.jpg': [
        {
          width: 1200
        },
        {
          width: 300,
          rename: {
            suffix: '-thumb'
          }
        }
      ]
    }))
    .pipe(imagemin([
      imagemin.gifsicle(),
      imageminWebp({
        quality: 90
      }),
      imageminWebp({
        quality: 90
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('./dist/images'));
});

// Save static files
gulp.task('static', function() {
  return gulp.src([
    './favicon.png',
    './CNAME'
  ]).pipe(gulp.dest('./dist'));
});

// JS
gulp.task('js', function() {
  return gulp.src([
    './js/*.js'
  ]).pipe(gulp.dest('./dist'));
});

// Vendor
gulp.task('vendor', function() {
  return gulp.src([
    './vendor/**/'
  ]).pipe(gulp.dest('./dist/vendor'));
});

// Publish!
gulp.task('publish', ['dist'], function() {
  return gulp.src('./dist/**/')
    .pipe(ghPages());
});

// Compile all assets
gulp.task('dist', ['views', 'sass', 'js', 'jpg', 'svg', 'static', 'vendor'], function() { });

// Default
gulp.task('default', ['dist'], function() {
  gulp.watch(['sass/*.sass', 'sass/**/*.sass'] , ['sass']);
  gulp.watch(['views/*.ejs', 'views/**/*.ejs'] , ['views']);
  gulp.watch('js/*.js' , ['js']);
  gulp.watch('images/*.jpg' , ['jpg']);
  gulp.watch('images/*.svg' , ['svg']);
});
