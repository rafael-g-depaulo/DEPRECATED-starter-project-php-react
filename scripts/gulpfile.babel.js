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

const babelConfig = {
  presets: ['@babel/env', '@babel/react'],
}

// Bundle the code, run transpilers and bundle it
const build = () => browserify({
    entries: [`${path.source}/${path.main}`],
    debug: true
  })
  .transform(babelify, babelConfig)
  .bundle()
  .pipe(source(path.bundle))
  .pipe(buffer())

// write bundled code to build path
const buildDev = () => build()
  .pipe(gulp.dest(path.build))

// uglify bundled code and write to build path
const buildProd = () => build()
  .pipe(uglify())
  .pipe(gulp.dest(path.build))

// build_dev task
export const build_dev = done => (buildDev(), done())

// build_prod task
export const build_prod = done => (buildProd(), done())

// default task
export default done => done()