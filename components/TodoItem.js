export default function TodoItem (todo) {
  return (
    `
      <li>
        <input
          type="checkbox"
          ${ todo.completed ? 'checked' : '' }
          data-id="${ todo.id }"
          class="toggle-checkbox"
        />
        <a
          href="/#/detail/${ todo.id }"
          style="text-decoration:${ todo.completed ? 'line-through' : '' }"
        >${ todo.content }</a>
        <button
          data-id="${ todo.id }"
          class="remove-btn"
        >REMOVE</button>
      </li>
    `
  )
}