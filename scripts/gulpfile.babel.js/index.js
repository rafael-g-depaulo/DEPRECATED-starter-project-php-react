// this is a gulpfile. it has tasks that can be run from the commandline with "gulp [task]"
// if no task is provided, the default task will be executed

import gulp, { dest, series, parallel } from "gulp"

// get path for the project's files
import config from './config'

// get tasks to run
import * as js from './javascript'
import * as css from './css'

// write bundled code to build path
export const build_dev = parallel(js.buildDev, css.buildDev)

// watch code and build on change
export const watch = () => gulp
  .watch(
    [ ...config.js.code, ...config.css.code ],
    { ignoreInitial: false },
    build_dev
  )

// uglify bundled code and write to build path
export const build_prod = parallel(js.buildProd, css.buildProd)

// default task
export default watch