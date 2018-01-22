const gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer');
  pug = require('gulp-pug');

gulp.task('sass',() =>
  gulp.src('./src/scss/*.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      sourceComments: true
    }))
    .pipe(autoprefixer({
      versions: ['last 2 browsers']
    }))
    .pipe(gulp.dest('./dist/css'))
);

gulp.task('sass-min',() =>
  gulp.src('./dist/css/*.css')
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(gulp.dest('./build/css'))
);

gulp.task('pug', () => 
  gulp.src('./src/views/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./dist/'))
);

gulp.task('pug-min', () => 
  gulp.src('./dist/*.html')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./build/'))
);

gulp.task('default', () => {
  gulp.watch('./src/scss/*.scss', ['sass','sass-min'])
  gulp.watch('./src/views/*.pug', ['pug', 'pug-min'])
})