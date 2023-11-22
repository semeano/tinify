const { series, parallel, src, dest } = require("gulp");
const clean = require("gulp-clean");
const smushit = require("gulp-smushit");

function cleanOutput() {
  return src("output", { allowEmpty: true }).pipe(clean({ force: true }));
}

function images(cb) {
  src("input/*.{jpg,png}")
    .pipe(smushit({ verbose: true }))
    .pipe(dest("output"));
  cb();
}

function pdfs(cb) {
  src("input/*.pdf").pipe(dest("output"));
  cb();
}

exports.default = series(cleanOutput, parallel(images, pdfs));
