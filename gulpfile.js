const {parallel, watch, series, src, dest, lastRun} = require('gulp');

const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const postcss = require ("gulp-postcss");
const cssnano = require ("cssnano");
const autoprefixer = require ("autoprefixer");

const paths = require('path');
const size = require('gulp-size');
const del = require("del");

const config = require('config');

function styles(done) {

    let plugins = [

        autoprefixer(
            "last 3 version", "> 1%"
        ),
        cssnano({
            "mergeLonghand": false,
            "discardComments": {removeAll: true}
        })
    ];

    return src(paths.join(config.devFolder,config.assetsFolder,config.stylesFolder, '**/*.scss'))
        .pipe(sassGlob())
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(size({
            showFiles: true
        }))
        .pipe(dest(paths.join(config.distFolder, config.stylesFolder)));

    done();

}

function deleteDist(done){
    return del(['./dist/'])
    done();
}

function serve() {
    watch(
        [
            paths.join(config.devFolder,config.assetsFolder,config.stylesFolder, '**/*.scss'),
            paths.join(config.devFolder,config.assetsFolder,config.scriptsFolder, '**/*.js'),
        ]
    ,series('styles'));
}

exports.styles = styles;
exports.deleteDist = deleteDist;
exports.delBuild = series(deleteDist, styles);
exports.serve = parallel(styles,serve);
