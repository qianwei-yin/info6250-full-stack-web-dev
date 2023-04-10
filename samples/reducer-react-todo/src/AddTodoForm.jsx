import { useState } from 'react';

function AddTodoForm({ onAddTodo }) {

  const [ task, setTask ] = useState('');

  function onSubmit(e) {
    e.preventDefault(); // Don't forget, confusion follows if form submits
    setTask('');
    onAddTodo(task);
  }

  function onTyping(e) {
    setTask(e.target.value);
  }

  return (
    <form className="add__form" action="#/add" onSubmit={onSubmit}>
      <input className="add__task" value={task} onChange={onTyping}/>
      <button type="submit" className="add__button">Add</button>
    </form>
  );
}

export default AddTodoForm;
