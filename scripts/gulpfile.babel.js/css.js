import gulp, { dest } from "gulp"
import concat from 'gulp-concat'
import sass from 'gulp-sass'
import cssnano from 'cssnano'
import postcss from 'gulp-postcss'

// get path and style config
import config from './config'

// Bundle the code, run transpilers and bundle it
const build = () => gulp
  // grab all of the style files
  .src(config.css.code)
  // transpile sass into css
  .pipe(sass().on('error', sass.logError))
  // concatenate the files (!IMPORTANT: THIS SHOULD BE A DINAMIC IMPORT MATCH, NOT A SIMPLE CONCAT!!!)
  .pipe(concat(config.css.bundle))

export const buildDev = () => build()
  // write the bundle to build directory
  .pipe(dest(config.build))

export const buildProd = () => build()
  // minify the bundle
  .pipe(postcss([cssnano()]))
  // write the bundle to build directory
  .pipe(dest(config.build))
