
var gulp         = require('gulp'),
    less         = require('gulp-less'),
    watch        = require('gulp-watch'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    minifyCSS    = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    server       = require('gulp-server-livereload');

var path = {
  css_dest: 'app/css',
  js_dest:  'app/js',
  css_src:  'app/css/src/**/*.less',
  js_src:   'app/js/src/**/*.js'
};

var bower_path = {
  css: [
    "bower_components/angular-material/angular-material.min.css"
  ],
  js: [
    "bower_components/angular/angular.js",
    "bower_components/angular-route/angular-route.js",
    "bower_components/angular-animate/angular-animate.min.js",
    "bower_components/angular-aria/angular-aria.min.js",
    "bower_components/angular-material/angular-material.min.js",
    "bower_components/angular-ckeditor/angular-ckeditor.min.js",
    "bower_components/firebase/firebase.js",
    "bower_components/angularfire/dist/angularfire.min.js"
  ]
};

gulp.task('js_vendor', function() {
  gulp.src(bower_path.js)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.js_dest));
});

gulp.task('css_vendor', function() {
  gulp.src(bower_path.css)
    .pipe(concat('vendor.min.css'))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.css_dest));
});

gulp.task('js_task', function() {
  gulp.src(path.js_src)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.js_dest));
});

gulp.task('css_task', function() {
  gulp.src(path.css_src)
    .pipe(concat('styles.min.css'))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.css_dest));
});

gulp.task('watch', ['css_vendor', 'js_vendor', 'js_task', 'css_task'], function() {
  gulp.watch(path.css_src, ['css_task']);
  gulp.watch(path.js_src, ['js_task']);
});

gulp.task('server', function() {
  gulp.src('app')
    .pipe(server({
      port: 3000,
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'server']);
