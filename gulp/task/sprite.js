'use strict';

module.exports = function($) {

    $.gulp.task('sprite', function() {
        var spriteData = $.gulp.src('./source/icons/**/*.png', {
                since: $.gulp.lastRun('sprite')
            })
            .pipe($.sprite({
                imgName: 'spritesheet.png',
                cssName: '_spritestyle.scss',
                cssFormat: 'scss',
                padding: 5
            }))

        // Pipe image stream through image optimizer and onto disk 
        var imgStream = spriteData.img
            .pipe($.gulp.dest('./source/tobuild/assets/images'));

        // Pipe CSS stream through CSS optimizer and onto disk 
        var cssStream = spriteData.css
            .pipe($.gulp.dest('./source/style/base/'));

        // Return a merged stream to handle both `end` events 
        return $.merge(imgStream, cssStream);

    });

};