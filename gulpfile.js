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
  gulpFilter = require('gulp-filter'),
  mainBowerFiles = require('gulp-main-bower-files'),
  flatten = require('gulp-flatten'),
  sourcemaps = require('gulp-sourcemaps');

const components = {
  "bootstrap": {
    "main": [
      './dist/css/bootstrap.min.css',
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
      './themes/smoothness/*.*',
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
    html: 'dist/',
    css: 'dist/css/',
    js: 'dist/js/',
    json: 'dist/json/',
    image: 'dist/image/',
    fonts: 'dist/fonts/'
  },
  watch: {
    html: 'app/html/*.html',
    sass: 'app/sass/*.sass',
    js: 'app/js/*.js'
  },
  clean: './dist/*',
  cleanOld: [
    'dist/*.html',
    'dist/css/*',
    'dist/js/*',
    'dist/json/*'
  ],
  components: {
    bowerJson: './bower.json',
    outPath: './dist/components/'
  }
};

const config = {
  server: {
    baseDir: "./dist"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "Frontend_Devil"
};

gulp.task('default', ['del', 'html', 'sass', 'scripts', 'publish-components', 'image', 'json', 'watchFile', 'server']);

gulp.task('prod', ['del', 'html', 'sass', 'scripts', 'image', 'json', 'publish-components']);

gulp.task('publish-components', function () {
  gulp.src(path.components.bowerJson)
    .pipe(mainBowerFiles({"overrides": components}))
    .pipe(gulp.dest(path.components.outPath))
});


gulp.task('html', function () {
  gulp.src(path.app.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('del', function () {
  delFIles(path.clean);
});

gulp.task('sass', function () {
  gulp.src(path.app.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())/*.on('error', sass.logError)*/
    .pipe(concat('style.css', {newLine: '\n\n'}))
    .pipe(autoPrefixer())
    .pipe(rename({suffix: '.min'}))
    .pipe(csso())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('scripts', function () {
  gulp.src(path.app.js)
    .pipe(sourcemaps.init())
    .pipe(concat('main-out.js', {newLine: ' \n\n '}))
    .pipe(babel({presets: ['env']}))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.dist.js));
});


gulp.task('json', function () {
  gulp.src(path.app.json)
    .pipe(jsonMinify())
    .pipe(gulp.dest(path.dist.json));
});

gulp.task('server', function () {
  browserSync.init(config);
});

gulp.task('watchFile', function () {
  gulp.watch(path.watch.html, ['html']);
  gulp.watch(path.watch.js, ['scripts']);
  gulp.watch(path.watch.sass, ['sass']);
  gulp.watch([path.watch.html, path.watch.js, path.watch.sass]).on('change', () => browserSync.reload({stream: true}))
});

gulp.task('image', function () {
  gulp.src(path.app.image)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.dist.image))
});

gulp.task('fonts', function () {
  gulp.src(path.app.fonts)
    .pipe(gulp.dest(path.dist.fonts))
});


/*
gulp.task('path', function () {
  gulp.src('app/index-test.html')
    .pipe(htmlreplace({
      'js': [
        'js/main-out.js'
      ],
      'css': [
        'css/style.css'
      ]
    })).on('error', (err, ww) => console.log(err, ww))
    .pipe(rename('assets.html'))
    .pipe(gulp.dest('./dist'));
});*/
