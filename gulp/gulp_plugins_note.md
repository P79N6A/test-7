gulp-minify-css
-------------

it is old, use gulp-clean-css instead..


gulp-clean-css
--------------
just simple warap `clean-css`
`cleanCss([options], [callback])`


    var gulp = require('gulp');
    var cleanCss = require('gulp-clean-css');
    gulp.task('minify-css', function() {
        return gulp.src('style/*.css')
                        .pipe(cleanCss({compatibility: 'ie8'}))
                        .pipe(gulp.dest('dist'));
    });

    var gulp = require('gulp');
    var cleanCSS = require('gulp-clean-css');
    gulp.task('minify-css', function() {
        return gulp.src('styles/*.css')
            .pipe(cleanCSS({debug: true}, function(details) {
                console.log(details.name + ': ' + details.stats.originalSize);
                console.log(details.name + ': ' + details.stats.minifiedSize);
            }))
            .pipe(gulp.dest('dist'));
    });


gulp-uglify
-----------


gulp-sync
--------