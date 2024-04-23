const express = require('express');
const bodyParser = require('body-parser');
const { resolve } = require('path');
const { writeFileSync, readFileSync } = require('fs');

const app = express();
const todoListPath = resolve(__dirname, './data/todoList.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/get_todolist', function (req, res) {
  const todoList = JSON.parse(readFileSync(todoListPath, 'utf8'));

  res.send({
    error_code: 0,
    error_msg: 'ok',
    data: todoList
  })
})

app.post('/get_todo', function (req, res) {
  const id = req.body.id;
  const todoList = JSON.parse(readFileSync(todoListPath, 'utf8'));
  const todoItem = todoList.find(todo => todo.id === (+id));

  res.send({
    error_code: 0,
    error_msg: 'ok',
    data: todoItem
  })
})

app.post('/add_todo', function (req, res) {
  const todo = req.body.todo;
  const todoList = JSON.parse(readFileSync(todoListPath, 'utf8'));
  todoList.push(todo);
  writeFileSync(todoListPath, JSON.stringify(todoList));

  res.send({
    error_code: 0,
    error_msg: 'ok',
    data: null
  })
})

app.post('/toggle_todo', function (req, res) {
  const id = req.body.id;
  let todoList = JSON.parse(readFileSync(todoListPath, 'utf8'));
  todoList = todoList.map(todo => {
    todo.id === id && (todo.completed = !todo.completed);
    return todo;
  })
  writeFileSync(todoListPath, JSON.stringify(todoList));

  res.send({
    error_code: 0,
    error_msg: 'ok',
    data: null
  })
})

app.post('/remove_todo', function (req, res) {
  const id = req.body.id;
  let todoList = JSON.parse(readFileSync(todoListPath, 'utf8'));
  todoList = todoList.filter(todo => todo.id !== id);
  writeFileSync(todoListPath, JSON.stringify(todoList));
  console.log(todoList)
  res.send({
    error_code: 0,
    error_msg: 'ok',
    data: null
  })
})

app.listen(8080, function () {
  console.log('Express server is running!');
})
