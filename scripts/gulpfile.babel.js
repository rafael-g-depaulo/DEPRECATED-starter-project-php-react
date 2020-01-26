// this is a gulpfile. it has tasks that can be run from the commandline with "gulp [task]"
// if no task is provided, the default task will be executed

import gulp from "gulp"
import babelify from 'babelify'
import uglify from 'gulp-uglify'
import browserify from 'browserify'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'

const path = {
  source: './src',
  build: './build',
  main: 'index.js',
  bundle: 'bundle.js',
}

// watch function
// const watch = task => gulp.watch('src/**/*.js', task)

const build = () => browserify({
    entries: [`${path.source}/${path.main}`],
    debug: true
  })
  // .on('error', err => console.log(err))
  .transform(babelify, {
    presets: ['@babel/env', '@babel/react']
  })
  .bundle()
  .pipe(source(path.bundle))
  .pipe(buffer())

const buildDev = () => build()
  .pipe(gulp.dest(path.build))

const buildProd = () => build()
  .pipe(uglify())
  .pipe(gulp.dest(path.build))

// build_dev task
export const build_dev = done => {
  buildDev()
  return done()
}

// build_prod task
export const build_prod = done => {
  buildProd()
  return done()
}

// default task
export default done => {
  console.log("default")
  // gulp.series(build_dev, gulp.watch('src/**/*.js', build_dev))
  done()
}