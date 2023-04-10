function TodoItem({
  todo,
  isLastAdded,
  onDeleteTodo,
  onToggleTodo,
}) {
  const isDoneClass = todo.done ? "todo__text--complete" : "";
  const isAddedClass = isLastAdded ? "todo__text--added" : "";
  return (
    <>
      <label>
        <input
          className="todo__toggle"
          data-id={todo.id}
          type="checkbox"
          checked={todo.done}
          onChange={ (e) => {
            const id = e.target.dataset.id;
            onToggleTodo(id);
          }}
        />
        <span
          data-id={todo.id}
          className={`todo__toggle todo__text ${ isDoneClass } ${isAddedClass}`}
        >
          {todo.task}
        </span>
      </label>
      <button
        data-id={todo.id}
        className="todo__delete"
        onClick={ (e) => {
          const id = e.target.dataset.id;
          onDeleteTodo(id);
        }}
      >
        &#10060;
      </button>
    </>
  );
}

export default TodoItem;
