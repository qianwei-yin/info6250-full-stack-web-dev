// This component has it's OWN state
// Used for "temporary" value, like what we type
import { useState } from 'react';

// "username" here is NOT the same as "username" in App.jsx
// We pass this username to the onLogin function we are passed
function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  return (
    <form>
      <label>
        <span>Username: </span>
        <input
          value={username}
          onInput={(e) => setUsername(e.target.value)}
        />
      </label>
      <button
        type="button"
        onClick={() => onLogin(username)}
      >
        Login
      </button>
    </form>
  );
}

export default Login;
