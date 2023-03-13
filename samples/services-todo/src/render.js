// Here we rebuild ALL the HTML whenever the state changes
// That is not the most efficient way to do it
// We COULD make these functions smarter about noticing what state changed
// and what HTML is dependent on that state
// and only replace the HTML that needs to be replaced
// but we'll be moving to React soon where someone has already written that
// The key part here is to see how the HTML is based on state
// - at this stage, the "action" is not visible, only the state
// - so our render is decoupled from the actions and events

function render({ state, appEl }) {
  const html = `
   <main class="">
     ${ generateStatusHtml( state ) }
     ${ generateLoginHtml( state ) }
     ${ generateContentHtml( state ) }
   </main>
  `;
  appEl.innerHTML = html;
}

function generateStatusHtml( state ) {
  return `
      <div class="status">${state.error}</div>
  `;
}

function generateLoginHtml( state ) {
  if(state.isLoginPending) {
    return `
      <div class="login__waiting">Loading user...</div>
    `
  }
  if(state.isLoggedIn) {
    return ``;
  }

  // The #/login below isn't "real" - the form should never navigate
  // I included it merely as a hint to what the form does
  return `
      <div class="login">
        <form class="login__form" action="#/login">
          <label>
            <span>Username:</span>
            <input class="login__username" value="">
          </label>
          <button class="login__button" type="submit">Login</button>
        </form>
      </div>
  `;
}

function generateContentHtml( state ) {
  if(!state.isLoggedIn) {
    return ``;
  }
  if(state.isTodoPending) {
    return `
      <div class="content">
        ${generateControlsHtml( state )}
        <div class="todos__waiting">Loading Todos...</div>
      </div>
    `;
  }
  return `
      <div class="content">
        ${generateControlsHtml( state )}
        <ul class="todos">${generateTodosHtml( state )}</ul>
        ${generateAddTodoHtml( state )}
      </div>
  `;
}

function generateControlsHtml( state ) {
  return `
        <div class="controls">
          <button class="controls__refresh">Refresh</button>
          <button class="controls__logout">Logout</button>
        </div>
  `;
}

function generateTodosHtml( state ) {
  const todosHtml = Object.values(state.todos).map( todo => {
    const isDoneClass = todo.done ? "todo__text--complete" : "";
    const isAddedClass = state.lastAddedTodoId === todo.id ? "todo__text--added" : "";
    return `
      <li class="todo">
        <label
        >
          <input
            class="todo__toggle"
            data-id="${todo.id}"
            type="checkbox"
            ${todo.done ? "checked" : ""}
          >
          <span
            data-id="${todo.id}"
            class="todo__toggle todo__text ${ isDoneClass } ${isAddedClass} "
          >
            ${todo.task}
          </span>
        </label>
        <button
          data-id="${todo.id}"
          class="todo__delete"
        >
          &#10060;
        </button>
      </li>
      `;
  }).join('') || `<p>No Todo Items yet, add one!</p>`;
  return todosHtml;
}

function generateAddTodoHtml( state ) {
  return `
        <form class="add__form" action="#/add">
          <input class="add__task">
          <button type="submit" class="add__button">Add</button>
        </form>
  `;
}

export default render;
