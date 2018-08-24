'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      todos: [{ id: '00001', text: 'hello' }]
    };
    return _this;
  }

  _createClass(App, [{
    key: 'handleDelete',
    value: function handleDelete(index) {
      var newTodosArr = this.state.todos.slice(0, index);
      newTodosArr.concat(this.state.todos.slice(index + 1));
      this.setState({
        todos: newTodosArr
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'todo-list' },
        this.state.todos.map(function (todo, index) {
          return React.createElement(Todo, {
            todo: todo,
            key: index,
            index: index,
            handleDelete: _this2.handleDelete.bind(_this2)
          });
        })
      );
    }
  }]);

  return App;
}(React.Component);

var Todo = function Todo(props) {
  return React.createElement(
    'li',
    { className: 'todo' },
    React.createElement(
      'span',
      null,
      props.todo.text
    ),
    React.createElement(
      'button',
      { 'data-action': 'edit' },
      'edit'
    ),
    React.createElement(
      'button',
      { onClick: function onClick() {
          return props.handleDelete(props.index);
        } },
      '\u2714'
    )
  );
};

// $(() => {

//   // View ////////////////////////////////////////////////////////////////////////

//   var template = _.template(`
//     <li data-id="<%=id%>" class="todo">
//       <span><%=text%></span>
//       <button data-action="edit">edit</button>
//       <button data-action="done">&#x2714;</button>
//     </li>
//   `);

//   var renderTodo = (todo) => {
//     return template(todo);
//   };

//   var addTodo = (todo) => {
//     $('#todos').append(renderTodo(todo));
//   };

//   var changeTodo = (id, todo) => {
//     $(`#todos [data-id=${id}]`).replaceWith(renderTodo(todo));
//   };

//   var removeTodo = (id) => {
//     $(`#todos [data-id=${id}]`).remove();
//   };

//   var addAllTodos = (todos) => {
//     _.each(todos, (todo) => {
//       addTodo(todo);
//     });
//   };

//   // Controller //////////////////////////////////////////////////////////////////

//   $('#form button').click( (event) => {
//     var text = $('#form input').val().trim();
//     if (text) {
//       Todo.create(text, addTodo);
//     }
//     $('#form input').val('');
//   });

//   $('#todos').delegate('button', 'click', (event) => {
//     var id = $(event.target.parentNode).data('id');
//     if ($(event.target).data('action') === 'edit') {
//       Todo.readOne(id, (todo) => {
//         var updatedText = prompt('Change to?', todo.text);
//         if (updatedText !== null && updatedText !== todo.text) {
//           Todo.update(id, updatedText, changeTodo.bind(null, id));
//         }
//       });
//     } else {
//       Todo.delete(id, removeTodo.bind(null, id));
//     }
//   });

//   // Initialization //////////////////////////////////////////////////////////////

//   console.log('CRUDdy Todo client is running the browser');
//   Todo.readAll(addAllTodos);

// });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpYy9jbGllbnQuanMiXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJzdGF0ZSIsInRvZG9zIiwiaWQiLCJ0ZXh0IiwiaW5kZXgiLCJuZXdUb2Rvc0FyciIsInNsaWNlIiwiY29uY2F0Iiwic2V0U3RhdGUiLCJtYXAiLCJ0b2RvIiwiaGFuZGxlRGVsZXRlIiwiYmluZCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiVG9kbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxHOzs7QUFDSixlQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsMEdBQ1hBLEtBRFc7O0FBR2pCLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxhQUFPLENBQUMsRUFBRUMsSUFBSSxPQUFOLEVBQWVDLE1BQU0sT0FBckIsRUFBRDtBQURJLEtBQWI7QUFIaUI7QUFNbEI7Ozs7aUNBRVlDLEssRUFBTztBQUNsQixVQUFJQyxjQUFjLEtBQUtMLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQkssS0FBakIsQ0FBdUIsQ0FBdkIsRUFBMEJGLEtBQTFCLENBQWxCO0FBQ0FDLGtCQUFZRSxNQUFaLENBQW1CLEtBQUtQLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQkssS0FBakIsQ0FBdUJGLFFBQVEsQ0FBL0IsQ0FBbkI7QUFDQSxXQUFLSSxRQUFMLENBQWM7QUFDWlAsZUFBT0k7QUFESyxPQUFkO0FBR0Q7Ozs2QkFFUTtBQUFBOztBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxXQUFmO0FBQ0csYUFBS0wsS0FBTCxDQUFXQyxLQUFYLENBQWlCUSxHQUFqQixDQUFxQixVQUFDQyxJQUFELEVBQU9OLEtBQVA7QUFBQSxpQkFDcEIsb0JBQUMsSUFBRDtBQUNFLGtCQUFNTSxJQURSO0FBRUUsaUJBQUtOLEtBRlA7QUFHRSxtQkFBT0EsS0FIVDtBQUlFLDBCQUFjLE9BQUtPLFlBQUwsQ0FBa0JDLElBQWxCO0FBSmhCLFlBRG9CO0FBQUEsU0FBckI7QUFESCxPQURGO0FBWUQ7Ozs7RUE5QmVDLE1BQU1DLFM7O0FBaUN4QixJQUFJQyxPQUFPLFNBQVBBLElBQU87QUFBQSxTQUNUO0FBQUE7QUFBQSxNQUFJLFdBQVUsTUFBZDtBQUNFO0FBQUE7QUFBQTtBQUFPaEIsWUFBTVcsSUFBTixDQUFXUDtBQUFsQixLQURGO0FBRUU7QUFBQTtBQUFBLFFBQVEsZUFBWSxNQUFwQjtBQUFBO0FBQUEsS0FGRjtBQUdFO0FBQUE7QUFBQSxRQUFRLFNBQVM7QUFBQSxpQkFBTUosTUFBTVksWUFBTixDQUFtQlosTUFBTUssS0FBekIsQ0FBTjtBQUFBLFNBQWpCO0FBQUE7QUFBQTtBQUhGLEdBRFM7QUFBQSxDQUFYOztBQVFBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdG9kb3M6IFt7IGlkOiAnMDAwMDEnLCB0ZXh0OiAnaGVsbG8nIH1dXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZURlbGV0ZShpbmRleCkge1xuICAgIHZhciBuZXdUb2Rvc0FyciA9IHRoaXMuc3RhdGUudG9kb3Muc2xpY2UoMCwgaW5kZXgpO1xuICAgIG5ld1RvZG9zQXJyLmNvbmNhdCh0aGlzLnN0YXRlLnRvZG9zLnNsaWNlKGluZGV4ICsgMSkpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdG9kb3M6IG5ld1RvZG9zQXJyXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9kby1saXN0XCI+XG4gICAgICAgIHt0aGlzLnN0YXRlLnRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IChcbiAgICAgICAgICA8VG9kb1xuICAgICAgICAgICAgdG9kbz17dG9kb31cbiAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICBpbmRleD17aW5kZXh9XG4gICAgICAgICAgICBoYW5kbGVEZWxldGU9e3RoaXMuaGFuZGxlRGVsZXRlLmJpbmQodGhpcyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbnZhciBUb2RvID0gcHJvcHMgPT4gKFxuICA8bGkgY2xhc3NOYW1lPVwidG9kb1wiPlxuICAgIDxzcGFuPntwcm9wcy50b2RvLnRleHR9PC9zcGFuPlxuICAgIDxidXR0b24gZGF0YS1hY3Rpb249XCJlZGl0XCI+ZWRpdDwvYnV0dG9uPlxuICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gcHJvcHMuaGFuZGxlRGVsZXRlKHByb3BzLmluZGV4KX0+JiN4MjcxNDs8L2J1dHRvbj5cbiAgPC9saT5cbik7XG5cbi8vICQoKCkgPT4ge1xuXG4vLyAgIC8vIFZpZXcgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vICAgdmFyIHRlbXBsYXRlID0gXy50ZW1wbGF0ZShgXG4vLyAgICAgPGxpIGRhdGEtaWQ9XCI8JT1pZCU+XCIgY2xhc3M9XCJ0b2RvXCI+XG4vLyAgICAgICA8c3Bhbj48JT10ZXh0JT48L3NwYW4+XG4vLyAgICAgICA8YnV0dG9uIGRhdGEtYWN0aW9uPVwiZWRpdFwiPmVkaXQ8L2J1dHRvbj5cbi8vICAgICAgIDxidXR0b24gZGF0YS1hY3Rpb249XCJkb25lXCI+JiN4MjcxNDs8L2J1dHRvbj5cbi8vICAgICA8L2xpPlxuLy8gICBgKTtcblxuLy8gICB2YXIgcmVuZGVyVG9kbyA9ICh0b2RvKSA9PiB7XG4vLyAgICAgcmV0dXJuIHRlbXBsYXRlKHRvZG8pO1xuLy8gICB9O1xuXG4vLyAgIHZhciBhZGRUb2RvID0gKHRvZG8pID0+IHtcbi8vICAgICAkKCcjdG9kb3MnKS5hcHBlbmQocmVuZGVyVG9kbyh0b2RvKSk7XG4vLyAgIH07XG5cbi8vICAgdmFyIGNoYW5nZVRvZG8gPSAoaWQsIHRvZG8pID0+IHtcbi8vICAgICAkKGAjdG9kb3MgW2RhdGEtaWQ9JHtpZH1dYCkucmVwbGFjZVdpdGgocmVuZGVyVG9kbyh0b2RvKSk7XG4vLyAgIH07XG5cbi8vICAgdmFyIHJlbW92ZVRvZG8gPSAoaWQpID0+IHtcbi8vICAgICAkKGAjdG9kb3MgW2RhdGEtaWQ9JHtpZH1dYCkucmVtb3ZlKCk7XG4vLyAgIH07XG5cbi8vICAgdmFyIGFkZEFsbFRvZG9zID0gKHRvZG9zKSA9PiB7XG4vLyAgICAgXy5lYWNoKHRvZG9zLCAodG9kbykgPT4ge1xuLy8gICAgICAgYWRkVG9kbyh0b2RvKTtcbi8vICAgICB9KTtcbi8vICAgfTtcblxuLy8gICAvLyBDb250cm9sbGVyIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyAgICQoJyNmb3JtIGJ1dHRvbicpLmNsaWNrKCAoZXZlbnQpID0+IHtcbi8vICAgICB2YXIgdGV4dCA9ICQoJyNmb3JtIGlucHV0JykudmFsKCkudHJpbSgpO1xuLy8gICAgIGlmICh0ZXh0KSB7XG4vLyAgICAgICBUb2RvLmNyZWF0ZSh0ZXh0LCBhZGRUb2RvKTtcbi8vICAgICB9XG4vLyAgICAgJCgnI2Zvcm0gaW5wdXQnKS52YWwoJycpO1xuLy8gICB9KTtcblxuLy8gICAkKCcjdG9kb3MnKS5kZWxlZ2F0ZSgnYnV0dG9uJywgJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4vLyAgICAgdmFyIGlkID0gJChldmVudC50YXJnZXQucGFyZW50Tm9kZSkuZGF0YSgnaWQnKTtcbi8vICAgICBpZiAoJChldmVudC50YXJnZXQpLmRhdGEoJ2FjdGlvbicpID09PSAnZWRpdCcpIHtcbi8vICAgICAgIFRvZG8ucmVhZE9uZShpZCwgKHRvZG8pID0+IHtcbi8vICAgICAgICAgdmFyIHVwZGF0ZWRUZXh0ID0gcHJvbXB0KCdDaGFuZ2UgdG8/JywgdG9kby50ZXh0KTtcbi8vICAgICAgICAgaWYgKHVwZGF0ZWRUZXh0ICE9PSBudWxsICYmIHVwZGF0ZWRUZXh0ICE9PSB0b2RvLnRleHQpIHtcbi8vICAgICAgICAgICBUb2RvLnVwZGF0ZShpZCwgdXBkYXRlZFRleHQsIGNoYW5nZVRvZG8uYmluZChudWxsLCBpZCkpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9KTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgVG9kby5kZWxldGUoaWQsIHJlbW92ZVRvZG8uYmluZChudWxsLCBpZCkpO1xuLy8gICAgIH1cbi8vICAgfSk7XG5cbi8vICAgLy8gSW5pdGlhbGl6YXRpb24gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gICBjb25zb2xlLmxvZygnQ1JVRGR5IFRvZG8gY2xpZW50IGlzIHJ1bm5pbmcgdGhlIGJyb3dzZXInKTtcbi8vICAgVG9kby5yZWFkQWxsKGFkZEFsbFRvZG9zKTtcblxuLy8gfSk7XG4iXX0=