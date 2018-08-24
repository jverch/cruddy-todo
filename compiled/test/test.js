'use strict';

var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');

var counter = require('../datastore/counter.js');
var todos = require('../datastore/index.js');

var initializeTestFiles = function initializeTestFiles() {
  counter.counterFile = path.join(__dirname, './counterTest.txt');
  todos.dataDir = path.join(__dirname, 'testData');
  todos.initialize();
};

var initializeTestCounter = function initializeTestCounter() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  fs.writeFileSync(counter.counterFile, id);
};

var cleanTestDatastore = function cleanTestDatastore() {
  fs.readdirSync(todos.dataDir).forEach(function (todo) {
    return fs.unlinkSync(path.join(todos.dataDir, todo));
  });
};

describe('getNextUniqueId', function () {
  before(initializeTestFiles);
  beforeEach(initializeTestCounter);
  beforeEach(cleanTestDatastore);

  it('should use error first callback pattern', function (done) {
    counter.getNextUniqueId(function (err, id) {
      expect(err).to.be.null;
      expect(id).to.exist;
      done();
    });
  });

  it('should give an id as a zero padded string', function (done) {
    counter.getNextUniqueId(function (err, id) {
      expect(id).to.be.a.string;
      expect(id).to.match(/^0/);
      done();
    });
  });

  it('should give the next id based on the count in the file', function (done) {
    fs.writeFileSync(counter.counterFile, '00025');
    counter.getNextUniqueId(function (err, id) {
      expect(id).to.equal('00026');
      done();
    });
  });

  it('should update the counter file with the next value', function (done) {
    fs.writeFileSync(counter.counterFile, '00371');
    counter.getNextUniqueId(function (err, id) {
      var counterFileContents = fs.readFileSync(counter.counterFile).toString();
      expect(counterFileContents).to.equal('00372');
      done();
    });
  });
});

describe('todos', function () {
  before(initializeTestFiles);
  beforeEach(initializeTestCounter);
  beforeEach(cleanTestDatastore);

  describe('create', function () {
    it('should create a new file for each todo', function (done) {
      todos.create('todo1', function (err, data) {
        var todoCount = fs.readdirSync(todos.dataDir).length;
        expect(todoCount).to.equal(1);
        todos.create('todo2', function (err, data) {
          expect(fs.readdirSync(todos.dataDir)).to.have.lengthOf(2);
          done();
        });
      });
    });

    it('should use the generated unique id as the filename', function (done) {
      fs.writeFileSync(counter.counterFile, '00142');
      todos.create('buy fireworks', function (err, todo) {
        var todoExists = fs.existsSync(path.join(todos.dataDir, '00143.txt'));
        expect(todoExists).to.be.true;
        done();
      });
    });

    it('should only save todo text contents in file', function (done) {
      var todoText = 'walk the dog';
      todos.create(todoText, function (err, todo) {
        var todoFileContents = fs.readFileSync(path.join(todos.dataDir, todo.id + '.txt')).toString();
        expect(todoFileContents).to.equal(todoText);
        done();
      });
    });

    it('should pass a todo object to the callback on success', function (done) {
      var todoText = 'refactor callbacks to promises';
      todos.create(todoText, function (err, todo) {
        expect(todo).to.include({ text: todoText });
        expect(todo).to.have.property('id');
        done();
      });
    });
  });

  describe('readAll', function () {
    it('should return an empty array when there are no todos', function (done) {
      todos.readAll(function (err, todoList) {
        expect(err).to.be.null;
        expect(todoList.length).to.equal(0);
        done();
      });
    });

    // Refactor this test when completing `readAll`
    it('should return an array with all saved todos', function (done) {
      var todo1text = 'todo 1';
      var todo2text = 'todo 2';
      var expectedTodoList = [{ id: '00001', text: 'todo 1' }, { id: '00002', text: 'todo 2' }];
      todos.create(todo1text, function (err, todo) {
        todos.create(todo2text, function (err, todo) {
          todos.readAll(function (err, todoList) {
            expect(todoList).to.have.lengthOf(2);
            expect(todoList).to.deep.include.members(expectedTodoList, 'NOTE: Text field should use the Id initially');
            done();
          });
        });
      });
    });
  });

  describe('readOne', function () {
    it('should return an error for non-existant todo', function (done) {
      todos.readOne('notAnId', function (err, todo) {
        expect(err).to.exist;
        done();
      });
    });

    it('should find a todo by id', function (done) {
      var todoText = 'buy chocolate';
      todos.create(todoText, function (err, createdTodo) {
        var id = createdTodo.id;
        todos.readOne(id, function (err, readTodo) {
          expect(readTodo).to.deep.equal({ id: id, text: todoText });
          done();
        });
      });
    });
  });

  describe('update', function () {
    beforeEach(function (done) {
      todos.create('original todo', done);
    });

    it('should not change the counter', function (done) {
      todos.update('00001', 'updated todo', function (err, todo) {
        var counterFileContents = fs.readFileSync(counter.counterFile).toString();
        expect(counterFileContents).to.equal('00001');
        done();
      });
    });

    it('should update the todo text for existing todo', function (done) {
      var todoId = '00001';
      var updatedTodoText = 'updated todo';
      todos.update(todoId, updatedTodoText, function (err, todo) {
        var todoFileContents = fs.readFileSync(path.join(todos.dataDir, todoId + '.txt')).toString();
        expect(todoFileContents).to.equal(updatedTodoText);
        done();
      });
    });

    it('should not create a new todo for non-existant id', function (done) {
      var initalTodoCount = fs.readdirSync(todos.dataDir).length;
      todos.update('00017', 'bad id', function (err, todo) {
        var currentTodoCount = fs.readdirSync(todos.dataDir).length;
        expect(currentTodoCount).to.equal(initalTodoCount);
        expect(err).to.exist;
        done();
      });
    });
  });

  describe('delete', function () {
    beforeEach(function (done) {
      todos.create('delete this todo', done);
    });

    it('should not change the counter', function (done) {
      todos.delete('00001', function (err) {
        var counterFileContents = fs.readFileSync(counter.counterFile).toString();
        expect(counterFileContents).to.equal('00001');
        done();
      });
    });

    it('should delete todo file by id', function (done) {
      todos.delete('00001', function (err) {
        var todoExists = fs.existsSync(path.join(todos.dataDir, '00001.txt'));
        expect(todoExists).to.be.false;
        done();
      });
    });

    it('should return an error for non-existant id', function (done) {
      var initalTodoCount = fs.readdirSync(todos.dataDir).length;
      todos.delete('07829', function (err) {
        var currentTodoCount = fs.readdirSync(todos.dataDir).length;
        expect(currentTodoCount).to.equal(initalTodoCount);
        expect(err).to.exist;
        done();
      });
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QvdGVzdC5qcyJdLCJuYW1lcyI6WyJleHBlY3QiLCJyZXF1aXJlIiwiZnMiLCJwYXRoIiwiY291bnRlciIsInRvZG9zIiwiaW5pdGlhbGl6ZVRlc3RGaWxlcyIsImNvdW50ZXJGaWxlIiwiam9pbiIsIl9fZGlybmFtZSIsImRhdGFEaXIiLCJpbml0aWFsaXplIiwiaW5pdGlhbGl6ZVRlc3RDb3VudGVyIiwiaWQiLCJ3cml0ZUZpbGVTeW5jIiwiY2xlYW5UZXN0RGF0YXN0b3JlIiwicmVhZGRpclN5bmMiLCJmb3JFYWNoIiwidW5saW5rU3luYyIsInRvZG8iLCJkZXNjcmliZSIsImJlZm9yZSIsImJlZm9yZUVhY2giLCJpdCIsImdldE5leHRVbmlxdWVJZCIsImVyciIsInRvIiwiYmUiLCJudWxsIiwiZXhpc3QiLCJkb25lIiwiYSIsInN0cmluZyIsIm1hdGNoIiwiZXF1YWwiLCJjb3VudGVyRmlsZUNvbnRlbnRzIiwicmVhZEZpbGVTeW5jIiwidG9TdHJpbmciLCJjcmVhdGUiLCJkYXRhIiwidG9kb0NvdW50IiwibGVuZ3RoIiwiaGF2ZSIsImxlbmd0aE9mIiwidG9kb0V4aXN0cyIsImV4aXN0c1N5bmMiLCJ0cnVlIiwidG9kb1RleHQiLCJ0b2RvRmlsZUNvbnRlbnRzIiwiaW5jbHVkZSIsInRleHQiLCJwcm9wZXJ0eSIsInJlYWRBbGwiLCJ0b2RvTGlzdCIsInRvZG8xdGV4dCIsInRvZG8ydGV4dCIsImV4cGVjdGVkVG9kb0xpc3QiLCJkZWVwIiwibWVtYmVycyIsInJlYWRPbmUiLCJjcmVhdGVkVG9kbyIsInJlYWRUb2RvIiwidXBkYXRlIiwidG9kb0lkIiwidXBkYXRlZFRvZG9UZXh0IiwiaW5pdGFsVG9kb0NvdW50IiwiY3VycmVudFRvZG9Db3VudCIsImRlbGV0ZSIsImZhbHNlIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLFNBQVNDLFFBQVEsTUFBUixFQUFnQkQsTUFBL0I7QUFDQSxJQUFNRSxLQUFLRCxRQUFRLElBQVIsQ0FB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QixNQUF0RDtBQUNBcEMsWUFBTThELE1BQU4sQ0FBYSxPQUFiLEVBQXNCLGVBQU87QUFDM0IsWUFBTUQsbUJBQW1CaEUsR0FBR2MsV0FBSCxDQUFlWCxNQUFNSyxPQUFyQixFQUE4QitCLE1BQXZEO0FBQ0F6QyxlQUFPa0UsZ0JBQVAsRUFBeUJ4QyxFQUF6QixDQUE0QlEsS0FBNUIsQ0FBa0MrQixlQUFsQztBQUNBakUsZUFBT3lCLEdBQVAsRUFBWUMsRUFBWixDQUFlRyxLQUFmO0FBQ0FDO0FBQ0QsT0FMRDtBQU1ELEtBUkQ7QUFTRCxHQWhDRDtBQWlDRCxDQTFLRCIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXhwZWN0ID0gcmVxdWlyZSgnY2hhaScpLmV4cGVjdDtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbmNvbnN0IGNvdW50ZXIgPSByZXF1aXJlKCcuLi9kYXRhc3RvcmUvY291bnRlci5qcycpO1xuY29uc3QgdG9kb3MgPSByZXF1aXJlKCcuLi9kYXRhc3RvcmUvaW5kZXguanMnKTtcblxuY29uc3QgaW5pdGlhbGl6ZVRlc3RGaWxlcyA9ICgpID0+IHtcbiAgY291bnRlci5jb3VudGVyRmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL2NvdW50ZXJUZXN0LnR4dCcpO1xuICB0b2Rvcy5kYXRhRGlyID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ3Rlc3REYXRhJyk7XG4gIHRvZG9zLmluaXRpYWxpemUoKTtcbn07XG5cbmNvbnN0IGluaXRpYWxpemVUZXN0Q291bnRlciA9IChpZCA9ICcnKSA9PiB7XG4gIGZzLndyaXRlRmlsZVN5bmMoY291bnRlci5jb3VudGVyRmlsZSwgaWQpO1xufTtcblxuY29uc3QgY2xlYW5UZXN0RGF0YXN0b3JlID0gKCkgPT4ge1xuICBmcy5yZWFkZGlyU3luYyh0b2Rvcy5kYXRhRGlyKS5mb3JFYWNoKHRvZG8gPT5cbiAgICBmcy51bmxpbmtTeW5jKHBhdGguam9pbih0b2Rvcy5kYXRhRGlyLCB0b2RvKSlcbiAgKTtcbn07XG5cbmRlc2NyaWJlKCdnZXROZXh0VW5pcXVlSWQnLCAoKSA9PiB7XG4gIGJlZm9yZShpbml0aWFsaXplVGVzdEZpbGVzKTtcbiAgYmVmb3JlRWFjaChpbml0aWFsaXplVGVzdENvdW50ZXIpO1xuICBiZWZvcmVFYWNoKGNsZWFuVGVzdERhdGFzdG9yZSk7XG5cbiAgaXQoJ3Nob3VsZCB1c2UgZXJyb3IgZmlyc3QgY2FsbGJhY2sgcGF0dGVybicsIGRvbmUgPT4ge1xuICAgIGNvdW50ZXIuZ2V0TmV4dFVuaXF1ZUlkKChlcnIsIGlkKSA9PiB7XG4gICAgICBleHBlY3QoZXJyKS50by5iZS5udWxsO1xuICAgICAgZXhwZWN0KGlkKS50by5leGlzdDtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBnaXZlIGFuIGlkIGFzIGEgemVybyBwYWRkZWQgc3RyaW5nJywgZG9uZSA9PiB7XG4gICAgY291bnRlci5nZXROZXh0VW5pcXVlSWQoKGVyciwgaWQpID0+IHtcbiAgICAgIGV4cGVjdChpZCkudG8uYmUuYS5zdHJpbmc7XG4gICAgICBleHBlY3QoaWQpLnRvLm1hdGNoKC9eMC8pO1xuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGdpdmUgdGhlIG5leHQgaWQgYmFzZWQgb24gdGhlIGNvdW50IGluIHRoZSBmaWxlJywgZG9uZSA9PiB7XG4gICAgZnMud3JpdGVGaWxlU3luYyhjb3VudGVyLmNvdW50ZXJGaWxlLCAnMDAwMjUnKTtcbiAgICBjb3VudGVyLmdldE5leHRVbmlxdWVJZCgoZXJyLCBpZCkgPT4ge1xuICAgICAgZXhwZWN0KGlkKS50by5lcXVhbCgnMDAwMjYnKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCB1cGRhdGUgdGhlIGNvdW50ZXIgZmlsZSB3aXRoIHRoZSBuZXh0IHZhbHVlJywgZG9uZSA9PiB7XG4gICAgZnMud3JpdGVGaWxlU3luYyhjb3VudGVyLmNvdW50ZXJGaWxlLCAnMDAzNzEnKTtcbiAgICBjb3VudGVyLmdldE5leHRVbmlxdWVJZCgoZXJyLCBpZCkgPT4ge1xuICAgICAgY29uc3QgY291bnRlckZpbGVDb250ZW50cyA9IGZzXG4gICAgICAgIC5yZWFkRmlsZVN5bmMoY291bnRlci5jb3VudGVyRmlsZSlcbiAgICAgICAgLnRvU3RyaW5nKCk7XG4gICAgICBleHBlY3QoY291bnRlckZpbGVDb250ZW50cykudG8uZXF1YWwoJzAwMzcyJyk7XG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCd0b2RvcycsICgpID0+IHtcbiAgYmVmb3JlKGluaXRpYWxpemVUZXN0RmlsZXMpO1xuICBiZWZvcmVFYWNoKGluaXRpYWxpemVUZXN0Q291bnRlcik7XG4gIGJlZm9yZUVhY2goY2xlYW5UZXN0RGF0YXN0b3JlKTtcblxuICBkZXNjcmliZSgnY3JlYXRlJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgY3JlYXRlIGEgbmV3IGZpbGUgZm9yIGVhY2ggdG9kbycsIGRvbmUgPT4ge1xuICAgICAgdG9kb3MuY3JlYXRlKCd0b2RvMScsIChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgY29uc3QgdG9kb0NvdW50ID0gZnMucmVhZGRpclN5bmModG9kb3MuZGF0YURpcikubGVuZ3RoO1xuICAgICAgICBleHBlY3QodG9kb0NvdW50KS50by5lcXVhbCgxKTtcbiAgICAgICAgdG9kb3MuY3JlYXRlKCd0b2RvMicsIChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgICBleHBlY3QoZnMucmVhZGRpclN5bmModG9kb3MuZGF0YURpcikpLnRvLmhhdmUubGVuZ3RoT2YoMik7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1c2UgdGhlIGdlbmVyYXRlZCB1bmlxdWUgaWQgYXMgdGhlIGZpbGVuYW1lJywgZG9uZSA9PiB7XG4gICAgICBmcy53cml0ZUZpbGVTeW5jKGNvdW50ZXIuY291bnRlckZpbGUsICcwMDE0MicpO1xuICAgICAgdG9kb3MuY3JlYXRlKCdidXkgZmlyZXdvcmtzJywgKGVyciwgdG9kbykgPT4ge1xuICAgICAgICBjb25zdCB0b2RvRXhpc3RzID0gZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4odG9kb3MuZGF0YURpciwgJzAwMTQzLnR4dCcpKTtcbiAgICAgICAgZXhwZWN0KHRvZG9FeGlzdHMpLnRvLmJlLnRydWU7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBvbmx5IHNhdmUgdG9kbyB0ZXh0IGNvbnRlbnRzIGluIGZpbGUnLCBkb25lID0+IHtcbiAgICAgIGNvbnN0IHRvZG9UZXh0ID0gJ3dhbGsgdGhlIGRvZyc7XG4gICAgICB0b2Rvcy5jcmVhdGUodG9kb1RleHQsIChlcnIsIHRvZG8pID0+IHtcbiAgICAgICAgY29uc3QgdG9kb0ZpbGVDb250ZW50cyA9IGZzXG4gICAgICAgICAgLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4odG9kb3MuZGF0YURpciwgYCR7dG9kby5pZH0udHh0YCkpXG4gICAgICAgICAgLnRvU3RyaW5nKCk7XG4gICAgICAgIGV4cGVjdCh0b2RvRmlsZUNvbnRlbnRzKS50by5lcXVhbCh0b2RvVGV4dCk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBwYXNzIGEgdG9kbyBvYmplY3QgdG8gdGhlIGNhbGxiYWNrIG9uIHN1Y2Nlc3MnLCBkb25lID0+IHtcbiAgICAgIGNvbnN0IHRvZG9UZXh0ID0gJ3JlZmFjdG9yIGNhbGxiYWNrcyB0byBwcm9taXNlcyc7XG4gICAgICB0b2Rvcy5jcmVhdGUodG9kb1RleHQsIChlcnIsIHRvZG8pID0+IHtcbiAgICAgICAgZXhwZWN0KHRvZG8pLnRvLmluY2x1ZGUoeyB0ZXh0OiB0b2RvVGV4dCB9KTtcbiAgICAgICAgZXhwZWN0KHRvZG8pLnRvLmhhdmUucHJvcGVydHkoJ2lkJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgncmVhZEFsbCcsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlbXB0eSBhcnJheSB3aGVuIHRoZXJlIGFyZSBubyB0b2RvcycsIGRvbmUgPT4ge1xuICAgICAgdG9kb3MucmVhZEFsbCgoZXJyLCB0b2RvTGlzdCkgPT4ge1xuICAgICAgICBleHBlY3QoZXJyKS50by5iZS5udWxsO1xuICAgICAgICBleHBlY3QodG9kb0xpc3QubGVuZ3RoKS50by5lcXVhbCgwKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBSZWZhY3RvciB0aGlzIHRlc3Qgd2hlbiBjb21wbGV0aW5nIGByZWFkQWxsYFxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGFycmF5IHdpdGggYWxsIHNhdmVkIHRvZG9zJywgZG9uZSA9PiB7XG4gICAgICBjb25zdCB0b2RvMXRleHQgPSAndG9kbyAxJztcbiAgICAgIGNvbnN0IHRvZG8ydGV4dCA9ICd0b2RvIDInO1xuICAgICAgY29uc3QgZXhwZWN0ZWRUb2RvTGlzdCA9IFtcbiAgICAgICAgeyBpZDogJzAwMDAxJywgdGV4dDogJ3RvZG8gMScgfSxcbiAgICAgICAgeyBpZDogJzAwMDAyJywgdGV4dDogJ3RvZG8gMicgfVxuICAgICAgXTtcbiAgICAgIHRvZG9zLmNyZWF0ZSh0b2RvMXRleHQsIChlcnIsIHRvZG8pID0+IHtcbiAgICAgICAgdG9kb3MuY3JlYXRlKHRvZG8ydGV4dCwgKGVyciwgdG9kbykgPT4ge1xuICAgICAgICAgIHRvZG9zLnJlYWRBbGwoKGVyciwgdG9kb0xpc3QpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCh0b2RvTGlzdCkudG8uaGF2ZS5sZW5ndGhPZigyKTtcbiAgICAgICAgICAgIGV4cGVjdCh0b2RvTGlzdCkudG8uZGVlcC5pbmNsdWRlLm1lbWJlcnMoXG4gICAgICAgICAgICAgIGV4cGVjdGVkVG9kb0xpc3QsXG4gICAgICAgICAgICAgICdOT1RFOiBUZXh0IGZpZWxkIHNob3VsZCB1c2UgdGhlIElkIGluaXRpYWxseSdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdyZWFkT25lJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVycm9yIGZvciBub24tZXhpc3RhbnQgdG9kbycsIGRvbmUgPT4ge1xuICAgICAgdG9kb3MucmVhZE9uZSgnbm90QW5JZCcsIChlcnIsIHRvZG8pID0+IHtcbiAgICAgICAgZXhwZWN0KGVycikudG8uZXhpc3Q7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBmaW5kIGEgdG9kbyBieSBpZCcsIGRvbmUgPT4ge1xuICAgICAgY29uc3QgdG9kb1RleHQgPSAnYnV5IGNob2NvbGF0ZSc7XG4gICAgICB0b2Rvcy5jcmVhdGUodG9kb1RleHQsIChlcnIsIGNyZWF0ZWRUb2RvKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkID0gY3JlYXRlZFRvZG8uaWQ7XG4gICAgICAgIHRvZG9zLnJlYWRPbmUoaWQsIChlcnIsIHJlYWRUb2RvKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KHJlYWRUb2RvKS50by5kZWVwLmVxdWFsKHsgaWQsIHRleHQ6IHRvZG9UZXh0IH0pO1xuICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3VwZGF0ZScsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKGRvbmUgPT4ge1xuICAgICAgdG9kb3MuY3JlYXRlKCdvcmlnaW5hbCB0b2RvJywgZG9uZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCBjaGFuZ2UgdGhlIGNvdW50ZXInLCBkb25lID0+IHtcbiAgICAgIHRvZG9zLnVwZGF0ZSgnMDAwMDEnLCAndXBkYXRlZCB0b2RvJywgKGVyciwgdG9kbykgPT4ge1xuICAgICAgICBjb25zdCBjb3VudGVyRmlsZUNvbnRlbnRzID0gZnNcbiAgICAgICAgICAucmVhZEZpbGVTeW5jKGNvdW50ZXIuY291bnRlckZpbGUpXG4gICAgICAgICAgLnRvU3RyaW5nKCk7XG4gICAgICAgIGV4cGVjdChjb3VudGVyRmlsZUNvbnRlbnRzKS50by5lcXVhbCgnMDAwMDEnKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVwZGF0ZSB0aGUgdG9kbyB0ZXh0IGZvciBleGlzdGluZyB0b2RvJywgZG9uZSA9PiB7XG4gICAgICBjb25zdCB0b2RvSWQgPSAnMDAwMDEnO1xuICAgICAgY29uc3QgdXBkYXRlZFRvZG9UZXh0ID0gJ3VwZGF0ZWQgdG9kbyc7XG4gICAgICB0b2Rvcy51cGRhdGUodG9kb0lkLCB1cGRhdGVkVG9kb1RleHQsIChlcnIsIHRvZG8pID0+IHtcbiAgICAgICAgY29uc3QgdG9kb0ZpbGVDb250ZW50cyA9IGZzXG4gICAgICAgICAgLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4odG9kb3MuZGF0YURpciwgYCR7dG9kb0lkfS50eHRgKSlcbiAgICAgICAgICAudG9TdHJpbmcoKTtcbiAgICAgICAgZXhwZWN0KHRvZG9GaWxlQ29udGVudHMpLnRvLmVxdWFsKHVwZGF0ZWRUb2RvVGV4dCk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgY3JlYXRlIGEgbmV3IHRvZG8gZm9yIG5vbi1leGlzdGFudCBpZCcsIGRvbmUgPT4ge1xuICAgICAgY29uc3QgaW5pdGFsVG9kb0NvdW50ID0gZnMucmVhZGRpclN5bmModG9kb3MuZGF0YURpcikubGVuZ3RoO1xuICAgICAgdG9kb3MudXBkYXRlKCcwMDAxNycsICdiYWQgaWQnLCAoZXJyLCB0b2RvKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUb2RvQ291bnQgPSBmcy5yZWFkZGlyU3luYyh0b2Rvcy5kYXRhRGlyKS5sZW5ndGg7XG4gICAgICAgIGV4cGVjdChjdXJyZW50VG9kb0NvdW50KS50by5lcXVhbChpbml0YWxUb2RvQ291bnQpO1xuICAgICAgICBleHBlY3QoZXJyKS50by5leGlzdDtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdkZWxldGUnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaChkb25lID0+IHtcbiAgICAgIHRvZG9zLmNyZWF0ZSgnZGVsZXRlIHRoaXMgdG9kbycsIGRvbmUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgY2hhbmdlIHRoZSBjb3VudGVyJywgZG9uZSA9PiB7XG4gICAgICB0b2Rvcy5kZWxldGUoJzAwMDAxJywgZXJyID0+IHtcbiAgICAgICAgY29uc3QgY291bnRlckZpbGVDb250ZW50cyA9IGZzXG4gICAgICAgICAgLnJlYWRGaWxlU3luYyhjb3VudGVyLmNvdW50ZXJGaWxlKVxuICAgICAgICAgIC50b1N0cmluZygpO1xuICAgICAgICBleHBlY3QoY291bnRlckZpbGVDb250ZW50cykudG8uZXF1YWwoJzAwMDAxJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBkZWxldGUgdG9kbyBmaWxlIGJ5IGlkJywgZG9uZSA9PiB7XG4gICAgICB0b2Rvcy5kZWxldGUoJzAwMDAxJywgZXJyID0+IHtcbiAgICAgICAgY29uc3QgdG9kb0V4aXN0cyA9IGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHRvZG9zLmRhdGFEaXIsICcwMDAwMS50eHQnKSk7XG4gICAgICAgIGV4cGVjdCh0b2RvRXhpc3RzKS50by5iZS5mYWxzZTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlcnJvciBmb3Igbm9uLWV4aXN0YW50IGlkJywgZG9uZSA9PiB7XG4gICAgICBjb25zdCBpbml0YWxUb2RvQ291bnQgPSBmcy5yZWFkZGlyU3luYyh0b2Rvcy5kYXRhRGlyKS5sZW5ndGg7XG4gICAgICB0b2Rvcy5kZWxldGUoJzA3ODI5JywgZXJyID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudFRvZG9Db3VudCA9IGZzLnJlYWRkaXJTeW5jKHRvZG9zLmRhdGFEaXIpLmxlbmd0aDtcbiAgICAgICAgZXhwZWN0KGN1cnJlbnRUb2RvQ291bnQpLnRvLmVxdWFsKGluaXRhbFRvZG9Db3VudCk7XG4gICAgICAgIGV4cGVjdChlcnIpLnRvLmV4aXN0O1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==