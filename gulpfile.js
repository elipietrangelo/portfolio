const {parallel, watch, series, src, dest, lastRun} = require('gulp');

const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const postcss = require ("gulp-postcss");
const cssnano = require ("cssnano");
const autoprefixer = require ("autoprefixer");

const paths = require('path');
const size = require('gulp-size');
const del = require("del");
const postcssUncss = require('postcss-uncss');
const config = require('config');

let postCSSPlugins = [

    autoprefixer(
        "last 3 version", "> 1%"
    ),
    postcssUncss({
        csspath: paths.join(config.distFolder,config.stylesFolder,'styles.css'),
        htmlroot: config.distFolder,
        html: [
            paths.join(config.distFolder,'index.html'),
            paths.join(config.distFolder,'projects/**/*.html'),
            paths.join(config.distFolder,'project/**/*.html')
        ],
        stylesheets: [paths.join(config.distFolder,config.stylesFolder,'styles.css')],
        ignore: [
            /\.-active/,
            /\.-transitioned/,
            /\.-playing/,
            /\.overflow-hidden/
        ]
    }),
    cssnano({
        "mergeLonghand": false,
        "discardComments": {removeAll: true}
    })

];

function styles(done) {

    return src(paths.join(config.devFolder,config.assetsFolder,config.stylesFolder, '**/*.scss'))
        .pipe(sassGlob())
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(size({
            showFiles: true
        }))
        .pipe(dest(paths.join(config.distFolder, config.stylesFolder)));

    done();

}

function prodStyles(done) {

    return src(paths.join(config.devFolder,config.assetsFolder,config.stylesFolder, '**/*.scss'))
        .pipe(sassGlob())
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(postcss(postCSSPlugins))
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
exports.prodStyles = prodStyles;
exports.deleteDist = deleteDist;
exports.delBuild = series(deleteDist, styles);
exports.serve = parallel(styles,serve);
