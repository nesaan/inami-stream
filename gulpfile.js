
const webtask = require('./frontend');
const electrontask = require('./backend');
const {series, parallel} = require('gulp');
const start = require('./start');


exports.default = series(parallel(webtask, electrontask), start);