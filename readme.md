# TotallyStatical site generator

TotallyStatical is a barebone static site generator using Gulp to do all the heavy lifting.

### Requirements:

* [Node]( https://nodejs.org/download/ )

### Installation:

Run npm install:

`npm install`


## Tasks

### default

Runs the `gulp build` task which in turn runs the following tasks:
* `clean` - Delete entire build folder
* `bower` - Install bower dependencies if not yet installed
* `images` - copy and minify images to build folder
* `scripts:standalone` - copy standalone/header scripts to build folder
* `styles` - Add css and sourcemaps and distribute to build folder
* `scripts` - Concatinate and disstribute scripts to build folder
* `templates` - Compile jade templates

### watch

Run `gulp watch` to start webserver, watch files and livereload with browsersync

`gulp watch`

### build:production
Builds the app without sourcemaps and minified assets
* `clean` - Delete entire build folder
* `bower` - Install bower dependencies if not yet installed
* `images` - copy and minify images to build folder
* `scripts:standalone` - copy standalone/header scripts to build folder
* `styles:production` - Add css and sourcemaps and distribute to build folder
* `scripts` - Concatinate and disstribute scripts to build folder
* `templates` - Compile jade templates

### clean
Deletes build folder.
Uses:
* `del` plugin

### bower
Checks if bower dependencies in bower.json are installed, and if not, installs them.
Uses:
* `gulp-bower`

#### images
Minifies images and distributes them to the build asset folder
Uses:
* `gulp-images`
* `gulp-changed`




## Contains:
* Gulp
* Jade templating engine
* Node Sass Parser with:
  * [Susy v2]( http://susy.oddbird.net/ )
  * [Normalize]( https://github.com/JohnAlbin/normalize-scss )
  * [Breakpoint]( http://breakpoint-sass.com/ )
* Express server
* BrowserSync livereload