// NOTICE: We don't do a import React from 'react';
// That is old advice, unneeded!

import { useState } from 'react'; // no "path", we're importing from a library

import './App.css';
import Content from './Content'; // These have explicit paths, we're importing our own files
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // The below "wrapper" functions make the components more generic and reusable
  function onLogin(username) {
    setUsername(username);
    setIsLoggedIn(true);
  };
  function onLogout() {
    setIsLoggedIn(false);
  };

  // Notice we use "className", not "class"
  // Notice we use kebab-case classnames!
  // Notice the value in {} is replaced by result
  return (
    <div className="app">
      { isLoggedIn
        ? <Content
            username={username}
            onLogout={onLogout}
          />
        : <Login
            onLogin={onLogin}
          />
      }
    </div>
  );
}

export default App;
