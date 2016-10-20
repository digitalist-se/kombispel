var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    nunjucksRender = require('gulp-nunjucks-render'),
    data = require('gulp-data'),
    del = require('del');


gulp.task('nunjucks', function() {
    // Gets .html and .nunjucks files in pages
    return gulp.src('app/pages/**/*.+(html|nunjucks)')
        .pipe(data(function() {
            return require('./app/data.json')
        }))
        // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['app/templates'],
            watch: true
        }))
        // output files in app folder
        .pipe(gulp.dest('app'))

});