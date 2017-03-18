// Libraries
var gulp = require('gulp'),
  fs = require('fs'),
  sass = require('gulp-sass'),
  imagemin = require('gulp-imagemin'),
  responsive = require('gulp-responsive'),
  ejs = require("gulp-ejs"),
  imageminWebp = require('imagemin-webp');

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
})

// Compile all assets
gulp.task('dist', ['views', 'sass', 'jpg', 'svg'], function() { });

// Default
gulp.task('default', ['dist'], function() {
  gulp.watch(['sass/*.sass', 'sass/**/*.sass'] , ['sass']);
  gulp.watch(['views/*.ejs', 'views/**/*.ejs'] , ['views']);
  gulp.watch('images/*.jpg' , ['jpg']);
  gulp.watch('images/*.svg' , ['svg']);
});
