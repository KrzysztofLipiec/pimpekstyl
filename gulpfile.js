var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-ruby-sass'),
    historyApiFallback = require('connect-history-api-fallback');

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true,
        middleware: function(connect, opt) {
            return [ historyApiFallback ];
        }
    });
});

gulp.task('html', function () {
    gulp.src('./app/templates/*.html')
        .pipe(connect.reload());
});

gulp.task('scss', function () {
    return gulp.src('./app/sass/**/*.scss')
        .pipe(sass({sourcemap: true, sourcemapPath: '../scss'}))
        .on('error', function (err) { console.log(err.message); })
        .pipe(gulp.dest('./app/css/'));
});

gulp.task('watch', function () {
    gulp.watch(['./app/**/*'], ['html']);
    gulp.watch(['./app/sass/**/*.scss'], ['scss']);
});

gulp.task('default', ['connect', 'watch']);
