const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');
var Promise = require('bluebird');
Promise.promisifyAll(fs);

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    fs.writeFileAsync(`${exports.dataDir}/${id}.txt`, text).then(() => {
      callback(null, { id: id, text: text });
    });
  });
};

exports.readOne = (id, callback) => {
  fs.readdirAsync(exports.dataDir).then(files => {
    if (!_.contains(files, `${id}.txt`)) {
      callback('Error', null);
    } else {
      fs.readFileAsync(`${exports.dataDir}/${id}.txt`, 'utf8').then(data => {
        callback(null, { id: id, text: data });
      });
    }
  });
};

exports.readAll = callback => {
  fs.readdirAsync(exports.dataDir).then(files => {
    var promises = _.map(files, file => {
      return fs
        .readFileAsync(`${exports.dataDir}/${file}`, 'utf8')
        .then(function(data) {
          return { id: file.slice(0, 5), text: data };
        });
    });
    Promise.all(promises).then(function(array) {
      callback(null, array);
    });
  });
};

exports.update = (id, text, callback) => {
  fs.readdirAsync(exports.dataDir).then(files => {
    if (!_.contains(files, `${id}.txt`)) {
      callback('Error', null);
    } else {
      fs.writeFileAsync(`${exports.dataDir}/${id}.txt`, text).then(() => {
        callback(null, { id: id, text: text });
      });
    }
  });
};

exports.delete = (id, callback) => {
  fs.readdirAsync(exports.dataDir).then(files => {
    if (!_.contains(files, `${id}.txt`)) {
      callback('Error', null);
    } else {
      fs.unlinkAsync(`${exports.dataDir}/${id}.txt`).then(() => {
        return callback();
      });
    }
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
