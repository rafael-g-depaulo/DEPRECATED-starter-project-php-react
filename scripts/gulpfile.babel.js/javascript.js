
import gulp, { dest } from "gulp"
import babelify from 'babelify'
import uglify from 'gulp-uglify'
import browserify from 'browserify'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'

// get path for the project's files
import config from './config'

// get babel configuration
import { presets } from '../babel.config'

// Bundle the code, run transpilers and bundle it
const build = () => 
  // bundle the code
  browserify({
    entries: [`${config.js.source}/${config.js.main}`],
    debug: true
  })
  // transpile it into ES5
  .transform(babelify, { presets })
  .on('error', err => console.log(err))
  // bundle into a single file
  .bundle()
  // source the bundled file
  .pipe(source(config.js.bundle))
  // prepare a write buffer
  .pipe(buffer())


// write bundled code to build path
export const buildDev = () => build()
// write the bundle to build directory
  .pipe(dest(config.build))

// uglify bundled code and write to build path
export const buildProd = () => build()
  // minify the bundle
  .pipe(uglify())
  // write the bundle to build directory
  .pipe(dest(config.build))
