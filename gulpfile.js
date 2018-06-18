"use strict";

let gulp = require('gulp'),
  autoPrefixer = require('gulp-autoprefixer'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  csso = require('gulp-csso'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  jsonMinify = require('gulp-json-minify'),
  delFIles = require('del'),
  browserSync = require('browser-sync'),
  htmlreplace = require('gulp-html-replace'),
  rigger = require('gulp-rigger'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  mainBowerFiles = require('gulp-main-bower-files'),
  sourcemaps = require('gulp-sourcemaps'),
  debug = require('gulp-debug');


const components = {
  "bootstrap": {
    "main": [
      './dist/css/bootstrap.min.css',
      './dist/css/bootstrap.min.css.map',
      './dist/js/bootstrap.min.js'
    ]
  },
  "font-awesome": {
    "main": [
      './css/font-awesome.min.css',
      './fonts/*.*'
    ]
  },
  "jquery": {
    "main": [
      './dist/jquery.min.js'
    ]
  },
  "jquery-ui": {
    "main": [
      './themes/base/*.*',
      './themes/smoothness/**/*.*',
      './jquery-ui.min.js'
    ]
  }
};


const path = {
  app: {
    html: 'app/html/*.html',
    sass: 'app/sass/style.scss',
    js: 'app/js/**/*.js',
    json: 'app/json/*.json',
    image: 'app/image/*.*',
    fonts: ['app/fonts/*']
  },
  dist: {
    html: 'docs/',
    css: 'docs/css/',
    js: 'docs/js/',
    json: 'docs/json/',
    image: 'docs/image/',
    fonts: 'docs/fonts/'
  },
  watch: {
    html: 'app/html/**/*.html',
    sass: 'app/sass/**/*.scss',
    js: 'app/js/**/*.js',
    reload: 'docs/**/*.*'
  },
  clean: './docs/*',
  cleanOld: [
    'docs/*.html',
    'docs/css/*',
    'docs/js/*',
    'docs/json/*'
  ],
  components: {
    bowerJson: './bower.json',
    outPath: './docs/components/'
  }
};

const config = {
  server: {
    baseDir: "./docs"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "Frontend_Devil"
};


gulp.task('publish-components', function () {
  return gulp.src(path.components.bowerJson)
    .pipe(mainBowerFiles({"overrides": components}))
    .pipe(gulp.dest(path.components.outPath));
});

gulp.task('html', function () {
  return gulp.src(path.app.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('del', function () {
  return delFIles(path.clean);
});

gulp.task('sass', function () {
  return gulp.src(path.app.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())/*.on('error', sass.logError)*/
    .pipe(concat('style.css', {newLine: '\n\n'}))
    .pipe(autoPrefixer())
    .pipe(rename({suffix: '.min'}))
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('scripts', function () {
  return gulp.src(path.app.js)
    .pipe(debug())
    .pipe(sourcemaps.init())
    .pipe(concat('main-out.js', {newLine: ' \n\n '}))
    .pipe(babel({presets: ['env']}))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.js));
});


gulp.task('json', function () {
  return gulp.src(path.app.json)
    .pipe(jsonMinify())
    .pipe(gulp.dest(path.dist.json));
});

gulp.task('server', function () {
  browserSync.init(config);
  browserSync.watch(path.watch.reload).on('change', browserSync.reload);
});

gulp.task('watchFile', function () {
  gulp.watch(path.watch.html, gulp.parallel('html'));
  gulp.watch(path.watch.js, gulp.parallel('scripts'));
  gulp.watch(path.watch.sass, gulp.parallel('sass'));
  gulp.watch([path.watch.html, path.watch.js, path.watch.sass]).on('change', () => browserSync.reload());
});

gulp.task('image', function () {
  return gulp.src(path.app.image, {since: gulp.lastRun('image')})
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: true}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.dist.image));
});

gulp.task('fonts', function () {
  return gulp.src(path.app.fonts)
    .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('prod', gulp.series('del', gulp.parallel('publish-components', 'image', 'html', 'sass', 'scripts', 'json')));


gulp.task('default', gulp.series('del', gulp.parallel('publish-components', 'image', 'html', 'sass', 'scripts', 'json'), gulp.parallel('watchFile', 'server')));

gulp.task('sw', gulp.parallel('server', 'watchFile'));