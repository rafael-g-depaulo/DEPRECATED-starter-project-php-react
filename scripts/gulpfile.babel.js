// this is a gulpfile. it has tasks that can be run from the commandline with "gulp [task]"
// if no task is provided, the default task will be executed

import gulp, { dest } from "gulp"
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
  get code() { return `${this.source}/**/*.js` },
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
  .pipe(dest(path.build))

// uglify bundled code and write to build path
const buildProd = () => build()
  .pipe(uglify())
  .pipe(dest(path.build))

// build_dev task
export const build_dev = done => (buildDev(), done())
export const watch = done => (gulp.watch(path.code, { ignoreInitial: false }, build_dev))

// build_prod task
export const build_prod = done => (buildProd(), done())

// CSS
import sass from 'gulp-sass'
const cssPath = {
  style: './style',
  fileTypes: ['css', 'scss'],
  get styleGlobs() { return this.fileTypes.map(ext => `${this.style}/**/*.${ext}`) },
}

const buildStyles = () => gulp
  .src(cssPath.styleGlobs)
  .pipe(sass().on('error', sass.logError))
  .pipe(dest(path.build))

export const build_styles = done => (buildStyles(), done())

// default task
export default watch