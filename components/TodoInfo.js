export default function TodoInfo (todo) {
  return (
    `
      <div>
        <h1>${ todo.id }</h1>
        <p>${ todo.content }</p>
        <p>completed: ${ todo.completed ? 'Yes' : 'No' }</p>
        <p>
          <a href="/#/">Back</a>
        </p>
      </div>
    `
  )
}