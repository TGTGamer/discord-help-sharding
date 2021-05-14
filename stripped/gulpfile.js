const mdinclude = require('mdinclude');
const toc = require('gulp-markdown-toc');
const rename = require("gulp-rename");
const { src, dest, series } = require('gulp');

function createpackages() {
    return src('packages/**/index.source.md')
        .pipe(mdinclude())
        .pipe(rename(function (path) {
            path.basename = "index";
        }))
        .pipe(dest('packages'));
}

function createreadme() {
    return src('README-SOURCE.md')
        .pipe(mdinclude())
        .pipe(toc())
        .pipe(rename(function (path) {
            path.basename = "README";
        }))
        .pipe(dest('.'));
}

exports.default = series(
    createpackages,
    createreadme
)