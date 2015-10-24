# TotallyStatical site generator

TotallyStatical is a barebone static site generator using Gulp to do all the heavy lifting.

### Requirements:

* [Node]( https://nodejs.org/download/ )

### Installation:
* run `npm install` to install all node dependencies
* run `gulp` to install bower dependencies and build the development app

## Tasks

#### default

Runs the `build` task which in turn runs the following tasks:
* `clean` - Delete entire build folder
* `bower` - Install bower dependencies if not yet installed
* `images` - copy and minify images to build folder
* `scripts:standalone` - copy standalone/header scripts to build folder
* `styles` - Add css and sourcemaps and distribute to build folder
* `scripts` - Concatinate and disstribute scripts to build folder
* `templates` - Compile jade templates

#### watch

Run `gulp watch` to start webserver, watch files and livereload with browsersync

`gulp watch`

Uses:
* `gulp-watch`

#### build:production
Builds the app without sourcemaps and minified assets
* `clean` - Delete entire build folder
* `bower` - Install bower dependencies if not yet installed
* `images` - copy and minify images to build folder
* `scripts:standalone` - copy standalone/header scripts to build folder
* `styles:production` - Add css and sourcemaps and distribute to build folder
* `scripts` - Concatinate and disstribute scripts to build folder
* `templates` - Compile jade templates

#### clean
Deletes build folder.

Uses:
* `del` plugin

#### bower
Checks if bower dependencies in bower.json are installed, and if not, installs them.

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
Compile `/sass` folder to css, autoprefix and add sourcemaps for debugging

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

Uses:
* `gulp-jade`
* `gulp-jade-inheritance`
* `gulp-changed`
* `gulp-if`
* `gulp-filter`


## Contains:
* Gulp
* Jade templating engine
* Node Sass Parser with:
  * [Susy v2]( http://susy.oddbird.net/ )
  * [Normalize]( https://github.com/JohnAlbin/normalize-scss )
  * [Breakpoint]( http://breakpoint-sass.com/ )
* Express server
* BrowserSync livereload