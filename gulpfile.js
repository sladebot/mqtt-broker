'use strict'

const gulp = require('gulp')
const babel = require('gulp-babel')

gulp.task('compile', () => {
  return gulp.src(['./**/*.js', '!./node_modules{,/**}', '!./gulpfile.js', '!./test/**/*'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('copy-views', () => {
  return gulp.src([
    './views/**/*.ejs'
  ])
  .pipe(gulp.dest('./dist/views'))
})

gulp.task('copy-public', () => {
  return gulp.src([
    './public/**/**.*'
  ])
  .pipe(gulp.dest('./dist/public'))
})

gulp.task('default', ['compile', 'copy-public', 'copy-views'])
