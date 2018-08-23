const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    fs.writeFile(`${exports.dataDir}/${id}.txt`, text, err => {
      if (err) {
        throw err;
      } else {
        callback(null, { id: id, text: text });
      }
    });
  });
};

exports.readOne = (id, callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      throw err;
    } else {
      if (!_.contains(files, `${id}.txt`)) {
        callback('Error', null);
      } else {
        fs.readFile(`${exports.dataDir}/${id}.txt`, 'utf8', (err, data) => {
          if (err) {
            throw err;
          } else {
            callback(null, { id: id, text: data });
          }
        });
      }
    }
  });
};

exports.readAll = callback => {
  var data = [];
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      throw err;
    } else {
      _.each(files, file => {
        data.push({ id: file.slice(0, 5), text: file.slice(0, 5) });
        // fs.readFile(`${exports.dataDir}/${file}`, (err, data) => {
        //   if (err) {
        //     throw err;
        //   } else {
        //     console.log(data);
        //     console.log(JSON.parse(data));
        //   }
        // });
      });
      callback(null, data);
    }
  });
};

exports.update = (id, text, callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      throw err;
    } else {
      if (!_.contains(files, `${id}.txt`)) {
        callback('Error', null);
      } else {
        fs.writeFile(`${exports.dataDir}/${id}.txt`, text, err => {
          if (err) {
            throw err;
          } else {
            callback(null, { id: id, text: text });
          }
        });
      }
    }
  });
};

exports.delete = (id, callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      throw err;
    } else {
      if (!_.contains(files, `${id}.txt`)) {
        callback('Error', null);
      } else {
        fs.unlink(`${exports.dataDir}/${id}.txt`, err => {
          callback(err);
        });
      }
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
