class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [{ id: '00001', text: 'hello' }]
    };
  }

  handleDelete(index) {
    var newTodosArr = this.state.todos.slice(0, index);
    newTodosArr.concat(this.state.todos.slice(index + 1));
    this.setState({
      todos: newTodosArr
    });
  }

  render() {
    return (
      <div className="todo-list">
        {this.state.todos.map((todo, index) => (
          <Todo
            todo={todo}
            key={index}
            index={index}
            handleDelete={this.handleDelete.bind(this)}
          />
        ))}
      </div>
    );
  }
}

var Todo = props => (
  <li className="todo">
    <span>{props.todo.text}</span>
    <button data-action="edit">edit</button>
    <button onClick={() => props.handleDelete(props.index)}>&#x2714;</button>
  </li>
);

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
