import {
  fetchLogin,
  fetchLogout,
  fetchTodos,
  fetchUpdateTodo,
  fetchAddTodo,
  fetchDeleteTodo,
} from './services';
import {
  waitOnTodos,
  setTodos,
  setError,
  login,
  logout,
  updateTodo,
  addTodo,
} from './state';
import render from './render';

export function addAbilityToLogin({ state,  appEl }) {
  // Using 'submit' so we can get both submit via button-click and by "enter"
  appEl.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!e.target.classList.contains('login__form')) {
      return;
    }

    const username = appEl.querySelector('.login__username').value;
    waitOnTodos();
    render({ state, appEl }); // show loading state
    fetchLogin( username )
    .then( todos => {
      login(username);
      setTodos(todos);
      render({ state, appEl });
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      render({ state, appEl });
    });

  });
}

export function addAbilityToLogout({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if(!e.target.classList.contains('controls__logout')) {
      return;
    }
    logout();
    render({ state, appEl });
    fetchLogout() // We don't really care about results
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      render({ state, appEl });
    });
  });
}

export function addAbilityToRefresh({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if(!e.target.classList.contains('controls__refresh')) {
      return;
    }

    waitOnTodos(); // Show loading state
    render({ state, appEl });
    fetchTodos()
    .then( todos => {
      setTodos(todos);
      render({ state, appEl });
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      render({ state, appEl });
    });
  });
}

export function addAbilityToToggleComplete({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if(!e.target.classList.contains('todo__toggle')) {
      return;
    }
    const id = e.target.dataset.id;
    // Here I elect not show a waiting status...what impact could that have?
    fetchUpdateTodo(id, { done: !state.todos[id].done } )
    .then( todo => { // Service call returns the updated todo
      updateTodo({ id, todo });
      render({ state, appEl });
    })
    .catch( err => {
      console.log(err);
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      render({ state, appEl });
    });
  });
}

export function addAbilityToAddTodo({ state, appEl }) {
  appEl.addEventListener('submit', (e) => {
    if(!e.target.classList.contains('add__form')) {
      return;
    }
    const task = appEl.querySelector('.add__task').value;
    // Here I elect not show a waiting status...what impact could that have?
    fetchAddTodo(task)
    .then( todo => {
      // Notice we get the id of the new todo from the returned todo
      addTodo({ id: todo.id, todo });
      render({ state, appEl });
    })
    .catch( err => {
      console.log(err);
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      render({ state, appEl });
    });
  });
}

export function addAbilityToRemoveTodo({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if(!e.target.classList.contains('todo__delete')) {
      return;
    }
    const id = e.target.dataset.id;
    waitOnTodos(); // Show loading state
    render({ state, appEl });
    fetchDeleteTodo(id)
      .then( () => {
        return fetchTodos(); // Return the promise so we can chain
      })
      .then( todos => {
        setTodos(todos);
        render({ state, appEl });
      })
      .catch( err => {
        setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
        render({ state, appEl });
      });
  });
}

