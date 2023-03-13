import { SERVER, CLIENT } from './constants';
import state, {
  login,
  logout,
  waitOnTodos,
  setTodos,
  setError,
} from './state';
import {
  fetchAddTodo,
  fetchDeleteTodo,
  fetchUpdateTodo,
  fetchTodos,
  fetchSession,
} from './services';
import render from './render';
import {
  addAbilityToLogin,
  addAbilityToLogout,
  addAbilityToRefresh,
  addAbilityToToggleComplete,
  addAbilityToAddTodo,
  addAbilityToRemoveTodo,
} from './listeners';

// Main code
// This is where someone new to the code will see what happens on load
// You want to make it easy to see the big picture
// and easy to find the part you care about
// - Why did you come here? To fix a bug? Add a feature?
// - Make it easy to find the relevant code
// - skimmable

const appEl = document.querySelector('#app');
render({ state, appEl });
addAbilityToLogin({ state,  appEl });
addAbilityToLogout({ state, appEl });
addAbilityToRefresh({ state, appEl });
addAbilityToToggleComplete({ state, appEl });
addAbilityToAddTodo({ state, appEl });
addAbilityToRemoveTodo({ state, appEl });
checkForSession();

//////////

function checkForSession() {
  fetchSession()
  .then( session => { // The returned object from the service call
    login(session.username); // We do not have todos yet!
    render({ state, appEl });            // Show we are logged in but don't have todos
    return fetchTodos(); // By returning this promise we can chain the original promise
  })
  .catch( err => {
    if( err?.error === SERVER.AUTH_MISSING ) {
      return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
    }
    return Promise.reject(err); // Pass any other error unchanged
  })
  .then( todos => {
    setTodos(todos);
    render({ state, appEl });
  })
  .catch( err => {
    if( err?.error == CLIENT.NO_SESSION ) { // expected "error"
      logout(); // No longer waiting, set to logged out case
      render({ state, appEl });
      return;
    }
    // For unexpected errors, report them
    setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    render({ state, appEl });
  });
}

