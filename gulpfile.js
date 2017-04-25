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

gulp.task('default', ['compile'])
