const { src, dest, watch, series } = require('gulp')
const sass        = require('gulp-sass')(require('sass'))
const postcss     = require('gulp-postcss')
const terser      = require('gulp-terser')
const changed     = require('gulp-changed')
const imagemin    = require('gulp-imagemin')
const mozjpeg     = require('imagemin-mozjpeg')
const pngquant    = require('imagemin-pngquant')
const cssnano     = require('cssnano')
const browsersync = require('browser-sync')


//scssからcssに変換
const scssTask = () => {
    return src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(changed('./public/css'))
    .pipe(dest('./public/css'))
}

//JSファイルの最適化
const jsTask = () => {
    return src('./src/**/*.js')
    .pipe(terser())
    .pipe(changed('./public/js'))
    .pipe(dest('./public/js'))
}

//htmlをpublicに書き出し
const htmlTask = () => {
    return src('./src/**/*.html')
    .pipe(changed('./public'))
    .pipe(dest('./public'))
}

//画像の圧縮
//gulp-imagemin ^8.0.0だと動きません。
const imageTask = () => {
    return src('./src/img/**')
    .pipe(changed('./public/img'))
    .pipe(
        imagemin([
            imagemin.svgo(),
            pngquant({
                quality: [.60, .70],
                speed: 1
            }),
            mozjpeg({ quality: 65 }),
            imagemin.optipng,
            imagemin.gifsicle({ optimizationLevel: 3 })
        ])
    )
    .pipe(dest('./public/img'))
}

//監視
const watchTask = () => {
    watch('./src/**/*.html', series(htmlTask, browsersyncReload))
    watch('./src/img/**', series(imageTask, browsersyncReload))
    watch('./src/scss/**/*.scss', series(scssTask, browsersyncReload))
    watch('./src/js/**/*.js', series(jsTask, browsersyncReload))
}

//browsersyncの開始
const browsersyncServe = (cb) => {
    browsersync.init({
        server: {
            baseDir: './public'
        }
    })
    cb();
}

//browsersyncのリロード
const browsersyncReload = (cb) => {
    browsersync.reload();
    cb();
}

exports.run = series(
    htmlTask,
    imageTask,
    scssTask,
    jsTask,
    browsersyncServe,
    watchTask      
)

exports.build = series(
    htmlTask,
    imageTask,
    scssTask,
    jsTask
)

