var gulp = require('gulp'),
    connect = require('gulp-connect'),
    jade = require('gulp-jade'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps');
    
var OUT = 'www-build';

gulp.task('connect', function() {
    connect.server({
        root: 'www-build'
    });
});

gulp.task('jade', function() {
    gulp.src('www/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(OUT));
});

gulp.task('copyLib', function() {
    gulp.src('www/lib/**/*.js')
        .pipe(gulp.dest(OUT + '/lib'));
});

gulp.task('ts', function() {
    gulp.src(['www/app/**/*.ts', 'typings/**/*.d.ts'])
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            out: 'all.js'
        })).js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(OUT));
});

gulp.task('watch', function() {
    gulp.watch('www/**/*.jade', ['jade']);
    gulp.watch('www/app/**/*.ts', ['ts']);
});

gulp.task('dev', ['jade', 'copyLib', 'ts', 'watch']);
