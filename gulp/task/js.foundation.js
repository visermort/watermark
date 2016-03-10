'use strict';

module.exports = function($) {
  $.gulp.task('js.foundation', function() {
    return $.gulp.src($.path.foundation)
      .pipe($.gp.concat('foundation.min.js'))
      .pipe($.gp.uglify())
      .pipe($.gp.if(!$.dev, $.gp.rename({ suffix: '.rel='+ $.package.version })))
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};
