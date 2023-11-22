const { series, parallel, src, dest } = require("gulp");
const clean = require("gulp-clean");
const smushit = require("gulp-smushit");
const flatMap = require("flat-map").default;
const scaleImages = require("gulp-scale-images");

function cleanOutput() {
  return src("output", { allowEmpty: true }).pipe(clean({ force: true }));
}

function images(cb) {
  src("input/*.{jpeg, jpg, png}")
    .pipe(
      flatMap((file, cb) => {
        file.scale = { maxHeight: 1200 };
        cb(null, [file]);
      })
    )
    .pipe(scaleImages())
    .pipe(smushit({ verbose: true }))
    .pipe(dest("output"));
  cb();
}

function pdfs(cb) {
  src("input/*.pdf").pipe(dest("output"));
  cb();
}

exports.default = series(cleanOutput, parallel(images, pdfs));
