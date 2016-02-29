'use strict';

module.exports = function($) {
    $.gulp.task('copy.images', function() {
        // copy any files in ./source/images/*.* to build/
        return $.gulp.src($.path.images)
            .pipe($.gulp.dest($.config.root+'/images/'));
    });
};
