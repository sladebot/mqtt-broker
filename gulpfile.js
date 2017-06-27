'use strict'

const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')

gulp.task('compile-broker', () => {
  return gulp.src(['./**/*.js', '!./node_modules{,/**}', '!./gulpfile.js', '!./test/**/*'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('compile-sass', () => {
  return gulp.src('./app/styles/**/*.{scss,less,css}')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/public/css'))
})

gulp.task('compile-sass:watch', () => {
  gulp.watch('./app/styles/**/**.{scss,less,css}')
})

gulp.task('compile-js', () => {
  return gulp.src([
    './app/scripts/**/**.js'
  ])
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('./dist/public/js'))
})

gulp.task('copy-views', () => {
  return gulp.src([
    './app/views/**/*.ejs'
  ])
  .pipe(gulp.dest('./dist/app/views'))
})

gulp.task('copy-public', () => {
  return gulp.src([
    './app/public/**/**.*'
  ])
  .pipe(gulp.dest('./dist/app/public'))
})

gulp.task('default', ['compile-broker', 'compile-sass', 'compile-js', 'copy-public', 'copy-views'])
