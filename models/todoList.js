import http from '../libs/http';

function getTodoList () {
  return http('/api/get_todolist')
}

function getTodo (id) {
  return http.post('/api/get_todo', { id });
}

function addTodo (todo) {
  return http.post('/api/add_todo', { todo });
}

function toggleTodo (id) {
  return http.post('/api/toggle_todo', { id });
}

function removeTodo (id) {
  return http.post('/api/remove_todo', { id });
}

export {
  getTodoList,
  addTodo,
  getTodo,
  toggleTodo,
  removeTodo
}