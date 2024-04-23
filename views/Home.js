import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

export default function Home (todoList) {
  return (
    `
      <div>
        ${ TodoForm() }
        <ul id="list">
          ${
            todoList.map(todo => (
              TodoItem(todo)
            )).join('')
          }
        </ul>
      </div>
    `
  )
}