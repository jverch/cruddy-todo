'use strict';

// Todo Model //////////////////////////////////////////////////////////////////

window.Todo = {

  url: '/todo',

  // Create (Crud) -- collection
  create: function create(text, callback) {
    return $.ajax({
      url: this.url,
      type: 'POST',
      dataType: 'json',
      data: { todoText: text },
      success: callback
    });
  },

  // Read all (cRud) -- collection
  readAll: function readAll(callback) {
    return $.ajax({
      url: this.url,
      type: 'GET',
      dataType: 'json',
      success: callback
    });
  },

  // Read one (cRud) -- member
  readOne: function readOne(id, callback) {
    return $.ajax({
      url: this.url + '/' + id,
      type: 'GET',
      dataType: 'json',
      success: callback
    });
  },

  // Update (crUd) -- member
  update: function update(id, text, callback) {
    return $.ajax({
      url: this.url + '/' + id,
      type: 'PUT',
      dataType: 'json',
      data: { todoText: text },
      success: callback
    });
  },

  // Delete (cruD) -- member
  delete: function _delete(id, callback) {
    return $.ajax({
      url: this.url + '/' + id,
      type: 'DELETE',
      dataType: 'json',
      success: callback
    });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpYy90b2RvLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsIlRvZG8iLCJ1cmwiLCJjcmVhdGUiLCJ0ZXh0IiwiY2FsbGJhY2siLCIkIiwiYWpheCIsInR5cGUiLCJkYXRhVHlwZSIsImRhdGEiLCJ0b2RvVGV4dCIsInN1Y2Nlc3MiLCJyZWFkQWxsIiwicmVhZE9uZSIsImlkIiwidXBkYXRlIiwiZGVsZXRlIl0sIm1hcHBpbmdzIjoiOztBQUNBOztBQUVBQSxPQUFPQyxJQUFQLEdBQWM7O0FBRVpDLE9BQUssT0FGTzs7QUFJWjtBQUNBQyxVQUFRLGdCQUFTQyxJQUFULEVBQWVDLFFBQWYsRUFBeUI7QUFDL0IsV0FBT0MsRUFBRUMsSUFBRixDQUFPO0FBQ1pMLFdBQUssS0FBS0EsR0FERTtBQUVaTSxZQUFNLE1BRk07QUFHWkMsZ0JBQVUsTUFIRTtBQUlaQyxZQUFNLEVBQUNDLFVBQVVQLElBQVgsRUFKTTtBQUtaUSxlQUFTUDtBQUxHLEtBQVAsQ0FBUDtBQU9ELEdBYlc7O0FBZVo7QUFDQVEsV0FBUyxpQkFBU1IsUUFBVCxFQUFtQjtBQUMxQixXQUFPQyxFQUFFQyxJQUFGLENBQU87QUFDWkwsV0FBSyxLQUFLQSxHQURFO0FBRVpNLFlBQU0sS0FGTTtBQUdaQyxnQkFBVSxNQUhFO0FBSVpHLGVBQVNQO0FBSkcsS0FBUCxDQUFQO0FBTUQsR0F2Qlc7O0FBeUJaO0FBQ0FTLFdBQVMsaUJBQVNDLEVBQVQsRUFBYVYsUUFBYixFQUF1QjtBQUM5QixXQUFPQyxFQUFFQyxJQUFGLENBQU87QUFDWkwsV0FBUSxLQUFLQSxHQUFiLFNBQW9CYSxFQURSO0FBRVpQLFlBQU0sS0FGTTtBQUdaQyxnQkFBVSxNQUhFO0FBSVpHLGVBQVNQO0FBSkcsS0FBUCxDQUFQO0FBTUQsR0FqQ1c7O0FBbUNaO0FBQ0FXLFVBQVEsZ0JBQVNELEVBQVQsRUFBYVgsSUFBYixFQUFtQkMsUUFBbkIsRUFBNkI7QUFDbkMsV0FBT0MsRUFBRUMsSUFBRixDQUFPO0FBQ1pMLFdBQVEsS0FBS0EsR0FBYixTQUFvQmEsRUFEUjtBQUVaUCxZQUFNLEtBRk07QUFHWkMsZ0JBQVUsTUFIRTtBQUlaQyxZQUFNLEVBQUNDLFVBQVVQLElBQVgsRUFKTTtBQUtaUSxlQUFTUDtBQUxHLEtBQVAsQ0FBUDtBQU9ELEdBNUNXOztBQThDWjtBQUNBWSxVQUFRLGlCQUFTRixFQUFULEVBQWFWLFFBQWIsRUFBdUI7QUFDN0IsV0FBT0MsRUFBRUMsSUFBRixDQUFPO0FBQ1pMLFdBQVEsS0FBS0EsR0FBYixTQUFvQmEsRUFEUjtBQUVaUCxZQUFNLFFBRk07QUFHWkMsZ0JBQVUsTUFIRTtBQUlaRyxlQUFTUDtBQUpHLEtBQVAsQ0FBUDtBQU1EO0FBdERXLENBQWQiLCJmaWxlIjoidG9kby5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8gVG9kbyBNb2RlbCAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxud2luZG93LlRvZG8gPSB7XG5cbiAgdXJsOiAnL3RvZG8nLFxuXG4gIC8vIENyZWF0ZSAoQ3J1ZCkgLS0gY29sbGVjdGlvblxuICBjcmVhdGU6IGZ1bmN0aW9uKHRleHQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGRhdGE6IHt0b2RvVGV4dDogdGV4dH0sXG4gICAgICBzdWNjZXNzOiBjYWxsYmFja1xuICAgIH0pO1xuICB9LFxuXG4gIC8vIFJlYWQgYWxsIChjUnVkKSAtLSBjb2xsZWN0aW9uXG4gIHJlYWRBbGw6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgc3VjY2VzczogY2FsbGJhY2tcbiAgICB9KTtcbiAgfSxcblxuICAvLyBSZWFkIG9uZSAoY1J1ZCkgLS0gbWVtYmVyXG4gIHJlYWRPbmU6IGZ1bmN0aW9uKGlkLCBjYWxsYmFjaykge1xuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgdXJsOiBgJHt0aGlzLnVybH0vJHtpZH1gLFxuICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgc3VjY2VzczogY2FsbGJhY2tcbiAgICB9KTtcbiAgfSxcblxuICAvLyBVcGRhdGUgKGNyVWQpIC0tIG1lbWJlclxuICB1cGRhdGU6IGZ1bmN0aW9uKGlkLCB0ZXh0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgdXJsOiBgJHt0aGlzLnVybH0vJHtpZH1gLFxuICAgICAgdHlwZTogJ1BVVCcsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgZGF0YToge3RvZG9UZXh0OiB0ZXh0fSxcbiAgICAgIHN1Y2Nlc3M6IGNhbGxiYWNrXG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gRGVsZXRlIChjcnVEKSAtLSBtZW1iZXJcbiAgZGVsZXRlOiBmdW5jdGlvbihpZCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgIHVybDogYCR7dGhpcy51cmx9LyR7aWR9YCxcbiAgICAgIHR5cGU6ICdERUxFVEUnLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIHN1Y2Nlc3M6IGNhbGxiYWNrXG4gICAgfSk7XG4gIH1cbn07XG4iXX0=