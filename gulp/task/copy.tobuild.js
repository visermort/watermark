'use strict';

module.exports = function($) {
    $.gulp.task('copy.tobuild', function() {
        // copy any files in ./source/tobuild to build/
        return $.gulp.src($.path.tobuild)
            .pipe($.gulp.dest($.config.root+'/'));
    });
};
