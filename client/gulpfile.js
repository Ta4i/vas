var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var underscorify = require('node-underscorify');

gulp.task('build', function () {
    return browserify({
            entries: 'js/Vasco.js',
            extensions: ['.js'],
            debug: true
        })
        .transform(babelify)
        .transform(underscorify.transform({
            'extensions': ['html'],
            'requires': [{'variable': '_', 'module': 'lodash'}]
        }))
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('../public/js'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('js/**/*.js', ['build']);
});

gulp.task('default', ['watch']);