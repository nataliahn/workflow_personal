const gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer');
  pug = require('gulp-pug');
  browserSync = require('browser-sync'); 

gulp.task('sass',() =>
  gulp.src('./src/scss/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
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

gulp.task('sass-watch',['sass'], browserSync.reload);

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
  browserSync({ 
    server: {
      baseDir: './dist/'
    }
  });
  gulp.watch('./src/scss/*.scss', ['sass-watch','sass-min'])
  gulp.watch('./src/views/*.pug', ['pug', 'pug-min'])
})