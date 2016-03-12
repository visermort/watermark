'use strict';

module.exports = function($) {
    $.gulp.task('copy.php', function() {
        // copy any files in ./source/php/*.* to build/assets/php
        return $.gulp.src($.path.php)
            .pipe($.gulp.dest($.config.root+'/assets/php/'));
    });
};
