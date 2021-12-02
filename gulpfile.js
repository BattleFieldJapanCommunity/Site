const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const terser = require("gulp-terser");
const changed = require("gulp-changed");
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const cssnano = require("cssnano");
const browsersync = require("browser-sync");

//scssからcssに変換
const scssTask = () => {
  return src("./docs/scss/**/*.scss")
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(changed("./docs/css"))
    .pipe(dest("./docs/css"));
};

//JSファイルの最適化
const jsTask = () => {
  return src("./docs/js/**/*.js")
    .pipe(terser())
    .pipe(changed("./docs/js/"))
    .pipe(dest("./docs/js/min/"));
};

//監視
const watchTask = () => {
  watch("./docs/scss/**/*.scss", series(scssTask, browsersyncReload));
  watch("./docs/js/**/*.js", series(jsTask, browsersyncReload));
};

const watchJSTask = () => {
  watch("./docs/js/**/*.js", series(jsTask));
}

//browsersyncの開始
const browsersyncServe = (cb) => {
  browsersync.init({
    server: {
      baseDir: "./docs",
    },
  });
  cb();
};

//browsersyncのリロード
const browsersyncReload = (cb) => {
  browsersync.reload();
  cb();
};

exports.run = series(scssTask, jsTask, browsersyncServe, watchTask);
exports.watch = series(scssTask, jsTask, watchTask)
exports.watchJS = series(jsTask, watchJSTask)
exports.build = series(scssTask, jsTask);
