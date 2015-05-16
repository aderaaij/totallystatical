# TotallyStatical static site generator

TotallyStatical is a barebone static site generator using Gulp to do all the heavy lifting.
This package requires the following

### Requirements:

* [Node]( https://nodejs.org/download/ )

### Installation:

Run npm install:

`npm install`

Run the default gulp task to install all bower components and run build taks for the first time:

`gulp`

Run Gulp watch to start webserver, watch files and livereload

`gulp watch`

### Contains:
* Node Sass Parser with:
  * [Susy v2]( http://susy.oddbird.net/ )
  * [Normalize]( https://github.com/JohnAlbin/normalize-scss )
  * [Breakpoint]( http://breakpoint-sass.com/ )
* Connect server
* Livereload