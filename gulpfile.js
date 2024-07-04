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

// Sass and Tailwind CSS Task
function scssTask() {
  return src(paths.styles.src, { sourcemaps: true })
    .pipe(postcss([
      tailwindcss(),
      autoprefixer()
    ]))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      cssnano()
    ]))
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
