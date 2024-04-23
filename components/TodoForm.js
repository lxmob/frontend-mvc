export default function TodoForm () {
  return (
    `
      <form class="todo-form">
        <input
          type="text"
          placeholder="Input what you wanna add!"
          class="todo-text"
        />
        <button class="todo-add-btn">ADD</button>
      </form>
    `
  )
}
