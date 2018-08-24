'use strict';

var fs = require('fs');
var path = require('path');
var sprintf = require('sprintf-js').sprintf;
var Promise = require('bluebird');
Promise.promisifyAll(fs);

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

var zeroPaddedNumber = function zeroPaddedNumber(num) {
  return sprintf('%05d', num);
};

var readCounter = function readCounter(callback) {
  fs.readFileAsync(exports.counterFile).then(function (fileData) {
    callback(null, Number(fileData));
  });
};

var writeCounter = function writeCounter(count, callback) {
  var counterString = zeroPaddedNumber(count);
  fs.writeFileAsync(exports.counterFile, counterString).then(function () {
    callback(null, counterString);
  });
};

// Public API - Fix this function //////////////////////////////////////////////
var readCounterAsync = Promise.promisify(readCounter);

exports.getNextUniqueId = function (callback) {
  readCounterAsync().then(function (id) {
    writeCounter(id + 1, callback);
  });
};

// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2RhdGFzdG9yZS9jb3VudGVyLmpzIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsInBhdGgiLCJzcHJpbnRmIiwiUHJvbWlzZSIsInByb21pc2lmeUFsbCIsImNvdW50ZXIiLCJ6ZXJvUGFkZGVkTnVtYmVyIiwibnVtIiwicmVhZENvdW50ZXIiLCJyZWFkRmlsZUFzeW5jIiwiZXhwb3J0cyIsImNvdW50ZXJGaWxlIiwidGhlbiIsImNhbGxiYWNrIiwiTnVtYmVyIiwiZmlsZURhdGEiLCJ3cml0ZUNvdW50ZXIiLCJjb3VudCIsImNvdW50ZXJTdHJpbmciLCJ3cml0ZUZpbGVBc3luYyIsInJlYWRDb3VudGVyQXN5bmMiLCJwcm9taXNpZnkiLCJnZXROZXh0VW5pcXVlSWQiLCJpZCIsImpvaW4iLCJfX2Rpcm5hbWUiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsS0FBS0MsUUFBUSxJQUFSLENBQVg7QUFDQSxJQUFNQyxPQUFPRCxRQUFRLE1BQVIsQ0FBYjtBQUNBLElBQU1FLFVBQVVGLFFBQVEsWUFBUixFQUFzQkUsT0FBdEM7QUFDQSxJQUFJQyxVQUFVSCxRQUFRLFVBQVIsQ0FBZDtBQUNBRyxRQUFRQyxZQUFSLENBQXFCTCxFQUFyQjs7QUFFQSxJQUFJTSxVQUFVLENBQWQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUMsbUJBQW1CLFNBQW5CQSxnQkFBbUIsTUFBTztBQUM5QixTQUFPSixRQUFRLE1BQVIsRUFBZ0JLLEdBQWhCLENBQVA7QUFDRCxDQUZEOztBQUlBLElBQU1DLGNBQWMsU0FBZEEsV0FBYyxXQUFZO0FBQzlCVCxLQUFHVSxhQUFILENBQWlCQyxRQUFRQyxXQUF6QixFQUFzQ0MsSUFBdEMsQ0FBMkMsb0JBQVk7QUFDckRDLGFBQVMsSUFBVCxFQUFlQyxPQUFPQyxRQUFQLENBQWY7QUFDRCxHQUZEO0FBR0QsQ0FKRDs7QUFNQSxJQUFNQyxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsS0FBRCxFQUFRSixRQUFSLEVBQXFCO0FBQ3hDLE1BQUlLLGdCQUFnQlosaUJBQWlCVyxLQUFqQixDQUFwQjtBQUNBbEIsS0FBR29CLGNBQUgsQ0FBa0JULFFBQVFDLFdBQTFCLEVBQXVDTyxhQUF2QyxFQUFzRE4sSUFBdEQsQ0FBMkQsWUFBTTtBQUMvREMsYUFBUyxJQUFULEVBQWVLLGFBQWY7QUFDRCxHQUZEO0FBR0QsQ0FMRDs7QUFPQTtBQUNBLElBQUlFLG1CQUFtQmpCLFFBQVFrQixTQUFSLENBQWtCYixXQUFsQixDQUF2Qjs7QUFFQUUsUUFBUVksZUFBUixHQUEwQixvQkFBWTtBQUNwQ0YscUJBQW1CUixJQUFuQixDQUF3QixjQUFNO0FBQzVCSSxpQkFBYU8sS0FBSyxDQUFsQixFQUFxQlYsUUFBckI7QUFDRCxHQUZEO0FBR0QsQ0FKRDs7QUFNQTs7QUFFQUgsUUFBUUMsV0FBUixHQUFzQlYsS0FBS3VCLElBQUwsQ0FBVUMsU0FBVixFQUFxQixhQUFyQixDQUF0QiIsImZpbGUiOiJjb3VudGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHNwcmludGYgPSByZXF1aXJlKCdzcHJpbnRmLWpzJykuc3ByaW50ZjtcbnZhciBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcblByb21pc2UucHJvbWlzaWZ5QWxsKGZzKTtcblxudmFyIGNvdW50ZXIgPSAwO1xuXG4vLyBQcml2YXRlIGhlbHBlciBmdW5jdGlvbnMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBaZXJvIHBhZGRlZCBudW1iZXJzIGNhbiBvbmx5IGJlIHJlcHJlc2VudGVkIGFzIHN0cmluZ3MuXG4vLyBJZiB5b3UgZG9uJ3Qga25vdyB3aGF0IGEgemVyby1wYWRkZWQgbnVtYmVyIGlzLCByZWFkIHRoZVxuLy8gV2lraXBlZGlhIGVudHJ5IG9uIExlYWRpbmcgWmVyb3MgYW5kIGNoZWNrIG91dCBzb21lIG9mIGNvZGUgbGlua3M6XG4vLyBodHRwczovL3d3dy5nb29nbGUuY29tL3NlYXJjaD9xPXdoYXQraXMrYSt6ZXJvK3BhZGRlZCtudW1iZXIlM0ZcblxuY29uc3QgemVyb1BhZGRlZE51bWJlciA9IG51bSA9PiB7XG4gIHJldHVybiBzcHJpbnRmKCclMDVkJywgbnVtKTtcbn07XG5cbmNvbnN0IHJlYWRDb3VudGVyID0gY2FsbGJhY2sgPT4ge1xuICBmcy5yZWFkRmlsZUFzeW5jKGV4cG9ydHMuY291bnRlckZpbGUpLnRoZW4oZmlsZURhdGEgPT4ge1xuICAgIGNhbGxiYWNrKG51bGwsIE51bWJlcihmaWxlRGF0YSkpO1xuICB9KTtcbn07XG5cbmNvbnN0IHdyaXRlQ291bnRlciA9IChjb3VudCwgY2FsbGJhY2spID0+IHtcbiAgdmFyIGNvdW50ZXJTdHJpbmcgPSB6ZXJvUGFkZGVkTnVtYmVyKGNvdW50KTtcbiAgZnMud3JpdGVGaWxlQXN5bmMoZXhwb3J0cy5jb3VudGVyRmlsZSwgY291bnRlclN0cmluZykudGhlbigoKSA9PiB7XG4gICAgY2FsbGJhY2sobnVsbCwgY291bnRlclN0cmluZyk7XG4gIH0pO1xufTtcblxuLy8gUHVibGljIEFQSSAtIEZpeCB0aGlzIGZ1bmN0aW9uIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciByZWFkQ291bnRlckFzeW5jID0gUHJvbWlzZS5wcm9taXNpZnkocmVhZENvdW50ZXIpO1xuXG5leHBvcnRzLmdldE5leHRVbmlxdWVJZCA9IGNhbGxiYWNrID0+IHtcbiAgcmVhZENvdW50ZXJBc3luYygpLnRoZW4oaWQgPT4ge1xuICAgIHdyaXRlQ291bnRlcihpZCArIDEsIGNhbGxiYWNrKTtcbiAgfSk7XG59O1xuXG4vLyBDb25maWd1cmF0aW9uIC0tIERPIE5PVCBNT0RJRlkgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5leHBvcnRzLmNvdW50ZXJGaWxlID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ2NvdW50ZXIudHh0Jyk7XG4iXX0=