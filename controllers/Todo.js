import Home from '../views/Home';
import Detail from '../views/Detail';
import TodoItem from '../components/TodoItem';

import { todoService } from '../models';

export async function HomeView () {
  const res = await todoService.getTodoList();
  
  if (res.error_code === 0) {
    return Home(res.data);
  }
}

export async function DetailView (params) {
  const { id } = params;
  const res = await todoService.getTodo(id);

  if (res.error_code === 0) {
    return Detail(res.data);
  }
}

export function homeScript () {
  const app = document.getElementById('app');
  const todoForm = app.querySelector('.todo-form');
  const todoText = todoForm.querySelector('.todo-text');
  const todoAddBtn = todoForm.querySelector('.todo-add-btn');
  const todoList = app.querySelector('#list');

  function bindEvent () {
    todoForm.addEventListener('submit', handleAddTodo, false);
    todoAddBtn.addEventListener('click', handleAddTodo, false);
    todoList.addEventListener('click', handleListClick, false);
  }

  function handleAddTodo (e) {
    e.preventDefault();
    const inputText = todoText.value;

    if (!inputText.length) {
      return;
    }
    const curTodo = {
      id: Date.now(),
      content: inputText,
      completed: false
    }
    todoService.addTodo(curTodo).then((res) => {
      if (res.error_code === 0) {
        const listItem = TodoItem(curTodo);
        todoList.innerHTML += listItem;
        todoText.value = '';
      }
    })
  }

  function handleListClick (e) {
    const tar = e.target;
    const className = tar.className;

    switch (className) {
      case 'toggle-checkbox':
        handleToggleTodo(tar);
        break;
      case 'remove-btn':
        handleRemoveTodo(tar);
        break;
      default:
        break;
    }
  }

  function handleToggleTodo (e) {
    const id = +e.dataset.id;
    todoService.toggleTodo(id).then((res) => {
      if (res.error_code === 0) {
        const aText = e.parentNode.querySelector('a');
        const { textDecoration } = aText.style;
        aText.style.textDecoration = textDecoration ? '' : 'line-through';
      }
    })
  }

  function handleRemoveTodo (e) {
    const id = +e.dataset.id;
    todoService.removeTodo(id).then((res) => {
      if (res.error_code === 0) {
        e.parentNode.remove();
      }
    })
  }

  bindEvent();
}

export function detailScript () {
  console.log('detail-script...');
}
