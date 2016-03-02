'use strict';

module.exports = function($) {
    $.gulp.task('copy.php', function() {
        // copy any files in ./source/fonts/*.* to build/
        return $.gulp.src($.path.fonts)
            .pipe($.gulp.dest($.config.root+'/assets/php/'));
    });
};
