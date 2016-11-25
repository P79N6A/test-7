var gulp = require('gulp');
var tool = require('./debugtool');

// ------------

gulp.task('extractCss', function () {
	tool.map2files('css');
});

gulp.task('extractJs', function () {
	tool.map2files('js');
});

gulp.task('extractHtml', function () {
	tool.map2files('html');
});

gulp.task('extract', ['extractCss','extractJs','extractHtml' ], function () {
	console.log('extract all done');
});

// --------------

gulp.task('mergeCss', function () {
	tool.files2map('css');
});

gulp.task('mergeJs', function () {
	tool.files2map('js');
});

gulp.task('mergeHtml', function () {
	tool.files2map('html');
});

gulp.task('merge', ['mergeCss','mergeJs','mergeHtml' ], function () {
	console.log('merge all done');
});

// --------------

gulp.task('watchCss', function () {
	gulp.watch('cmps/css/*', ['mergeCss']);
});

gulp.task('watchJs', function () {
	gulp.watch('cmps/js/*', ['mergeJs']);
});

gulp.task('watchHtml', function () {
	gulp.watch('cmps/html/*', ['mergeHtml']);
});


// --------------

