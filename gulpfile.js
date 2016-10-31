var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var runSequence = require('run-sequence');
var sassdoc = require('sassdoc');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require("gulp-concat");
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');


// var data = require('gulp-data');
/////////////////////////////////////////////
//////// BROWSERSYNC
/////////////////////////////////////////////
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'dev'
        }
    })
});
/////////////////////////////////////////////
//////// SASS
/////////////////////////////////////////////
var autoprefixerOptions = {
    browsers: ['last 2 versions','ie >= 9', '> 5%', 'Firefox ESR']
};
gulp.task('sass', function() {
    return gulp.src(['dev/scss/**/*.scss','dev/templates/components/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dev/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
})
/////////////////////////////////////////////
//////// NUNJUCKS
/////////////////////////////////////////////
gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('dev/templates/pages/*.nunjucks')
  /////////////////////////////////////////////
  //* IF WE NEED TO FAKE API CALLS
  /////////////////////////////////////////////
  // Pass data from our mockup data to the template files
  // .pipe(data(function() {
  //   return require('./data.json')
  // }))

  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['dev/templates']
    }))
  // output files in dev folder
  .pipe(gulp.dest('dev'))
  // Reloades browser
  .pipe(browserSync.reload({
      stream: true
  }));
});
/////////////////////////////////////////////
//////// JAVASCRIPT
/////////////////////////////////////////////
gulp.task('js', function() {
	return gulp.src([
 // 'dev/templates/components/lottery/Lottery.js'
 'dev/templates/components/header/Header.js'
 // 'dev/js/app/settings.js',
 // 'dev/js/app/firebase.js',
])
    .pipe(sourcemaps.init())
		.pipe(concat('main.js'))
    .pipe(sourcemaps.write())
		.pipe(gulp.dest("dev/js"));
});
/////////////////////////////////////////////
//////// WATCH
/////////////////////////////////////////////
gulp.task('watch', function() {
    gulp.watch(['dev/scss/**/*.scss','dev/templates/components/**/*.scss' ], ['sass']);
    gulp.watch('dev/templates/**/*.nunjucks',['nunjucks']);
    gulp.watch('dev/*.html', browserSync.reload);
    gulp.watch("dev/templates/components/**/*.js", ["js"]);
    gulp.watch(['dev/js/**/*.js','dev/templates/components/**/*.js'], browserSync.reload);
})
/////////////////////////////////////////////
//////// DEFAULT GULP
/////////////////////////////////////////////
gulp.task('default', function(callback) {
    runSequence(['sass','js','nunjucks', 'browserSync', 'watch'],
        callback
    )
});

/////////////////////////////////////////////
//////// BUILD
/////////////////////////////////////////////
gulp.task('build', function(callback) {
  runSequence(["min-css","min-js"], callback)
});


gulp.task("min-css", function() {
  return gulp.src('dev/css/stylesheet.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('src/css/'));
})
gulp.task("min-css", function() {
  return gulp.src('dev/css/stylesheet.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('src/css/'));
})

gulp.task('min-js', function() {
  gulp.src('dev/js/main.js')
    .pipe(minify({
        ext:{
            src:'.js',
            min:'-min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dev/js/'))
});
