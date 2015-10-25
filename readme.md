# TotallyStatical site generator

A barebone static site generator / rapid prototype tool leveraging the power of Gulp for all the heavy lifting.

### Requirements:

* [Node]( https://nodejs.org/download/ )

### Installation:
* run `npm install` to install all node dependencies
* run `gulp` to install bower dependencies and build the development app for the first time
* run `gulp watch` to watch fie

### Features:
* Build, Clean and Watch tasks
* Synchronized browser testing with BrowserSync
* Jade templating with partials support*
* Blazing fast Node Sass (LibSass) parser
* Bower support. Includes the following Sass packaged by default:
  * [Susy v2]( http://susy.oddbird.net/ )
  * [Normalize]( https://github.com/JohnAlbin/normalize-scss )
  * [Breakpoint]( http://breakpoint-sass.com/ )
* Concatenating and minifying javascript
* Minifying images
* Creating SVG sprites with Svgstore
* Modular tasks and config files

## Tasks

All tasks are defined in `gulpfile.js/tasks`. Most tasks have a corresponding config file in `gulpfile.js/config`. Some share a config file and some just use `gulpfile.js/index.js`

#### default
Runs the `build` task

#### build

Builds app including sourcemaps. Runs the following tasks:
* [`clean`](#clean)
* [`bower`](#bower)
* [`images`](#images)
* [`scripts:standalone`](#scriptsstandalone)
* [`scripts`](#scripts)
* [`styles`](#styles)
* [`templates`](#templates)

#### build:production
Builds app with minified assets. Runs the following tasks:
* [`clean`](#clean)
* [`bower`](#bower)
* [`images`](#images)
* [`styles:production`](#stylesproduction)
* [`scripts:standalone`](#scriptsstandalone)
* [`scripts:production`](#scripts)
* [`templates`](#templates)

#### watch

Run `gulp watch` to start webserver, watch files and livereload with browsersync. Uses the `gulp-watch` plugin to correctly handle new files while watching.

Runs the tasks:
* [`browsersync`](#browsersync)
* [`setwatch`](#setwatch)
* [`templates`](#templates)

Uses:
* `gulp-watch`

#### clean
Deletes entire build folder.

Uses:
* `del` plugin

#### bower
Checks if bower dependencies specified in the `bower.json` file are installed, and if not, installs them.

Uses:
* `gulp-bower`

#### images
Minifies images and distributes them to the build asset folder

Uses:
* `gulp-images`
* `gulp-changed`

#### svg:sprites
Create a SVG sprite from icons in the configured folder

Uses:
* `gulp-images`
* `gulp-svgstore`

#### scripts
Concatenates, uglifies and distributes `.js` files to build folder.
* `gulp-concat`
* `gulp-rename`
* `gulp-uglify`
* `gulp-if`

#### scripts:standalone
Distributes standalone scripts to the build folder. Use for modernizr or other scripts that should be included standalone.

Uses:
* `gulp-changed`

#### styles
Compile `/sass` folder to css, autoprefix and add sourcemaps for debugging. In the corresponding config file it's possible to define bower packages with `includePaths` to easily define them with `@imports` in your .scss file. By default, the following paths are added"

* `./bower_components/normalize-scss/`
* `./bower_components/susy/sass/`
* `./bower_components/compass-breakpoint/stylesheets/`

Uses:
* `gulp-sass`
* `gulp-sourcemaps`
* `gulp-autoprefixer`
* `gulp-if`

#### styles:standalone
Compile `/sass`, to css, autoprefix and minify. Doesn't generate source maps

Uses:
* `gulp-sass`
* `gulp-autoprefixer`
* `gulp-minify-css`
* `gulp-rename`

#### templates
Generates html files from jade template. Every jade template prefixed with an underscore will not be built into a html file. To speed up the templating process `gulp-jade-inheritance` is used to check which template is dependent on which partial

Uses:
* `gulp-jade`
* `gulp-jade-inheritance`
* `gulp-changed`
* `gulp-if`
* `gulp-filter`

#### browsersync
Start browsersync server

Uses:
* `browser-sync`

#### setwatch
Sets a global watch variable to `true`. Use to execute certain taks, functions or configurations only when `gulp watch` is running.

## To-do
* Easily include js node_modules in the front-end (Webpack? Browserify?)