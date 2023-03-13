import { MESSAGES } from './constants';

const state = {
  // We store these as an object because we will access by id
  todos: {},
  isLoggedIn: false,
  isLoginPending: true, // We start with our login status unknown
  isTodoPending: false,
  username: '',
  lastAddedTodoId: '',
  error: '',
};

export function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.todos = {};
  state.error = '';
}

export function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
  state.lastAddedTodoId = '';
}

export function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.todos = {};
  state.error = '';
}

export function waitOnTodos() {
  state.todos = {};
  state.isTodoPending = true;
  state.error = '';
}

export function setTodos(todos) {
  state.todos = todos;
  state.isTodoPending = false;
  state.error = '';
  state.lastAddedTodoId = '';
}

export function updateTodo({ id, todo }) {
  state.todos[id] = todo;
  state.error = '';
  state.lastAddedTodoId = '';
}

export function addTodo({ id, todo }) {
  state.todos[id] = todo;
  state.lastAddedTodoId = id;
  state.error = '';
}

export function setError(error) {
  console.log(error);
  if(!error) {
    state.error = '';
    return;
  }
  state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;

