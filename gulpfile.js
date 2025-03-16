const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const tailwindcss = require('tailwindcss');

// Paths
const paths = {
  styles: {
    src: 'app/scss/style.scss',
    dest: 'dist'
  },
  scripts: {
    src: 'app/js/script.js',
    dest: 'dist'
  }
};

// Sass -> Tailwind -> Autoprefixer -> Minify
function scssTask() {
  return src(paths.styles.src, { sourcemaps: true })
    // 1) Compile SCSS into CSS
    .pipe(sass().on('error', sass.logError))

    // 2) Process with Tailwind + Autoprefixer
    .pipe(postcss([
      tailwindcss(),
      autoprefixer()
    ]))

    // 3) Minify the result
    .pipe(postcss([
      cssnano()
    ]))

    // 4) Write sourcemaps + output CSS
    .pipe(dest(paths.styles.dest, { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
  return src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(terser())
    .pipe(dest(paths.scripts.dest, { sourcemaps: '.' }));
}

// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}
function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch('*.html', browserSyncReload);
  watch(
    [paths.styles.src, 'app/scss/**/*.scss', paths.scripts.src],
    series(scssTask, jsTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
