const {src, dest} = require('gulp');
const babel = require('gulp-babel');
module.exports = function backend(){
  return src('src/electron/*.js')
    .pipe(babel())
    .pipe(dest('public/electron'));
}