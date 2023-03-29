import './index.css';
import { useState } from 'react';
import Login from './components/Login';
import Game from './components/Game';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [alertParams, setAlertParams] = useState({
		showAlert: false,
		alertType: '',
		alertMsg: '',
	});
	const [username, setUsername] = useState('helo');

	if (loggedIn)
		return (
			<Game state={{ loggedIn, alertParams, username }} setters={{ setLoggedIn, setAlertParams, setUsername }} />
		);

	return <Login state={{ loggedIn, alertParams, username }} setters={{ setLoggedIn, setAlertParams, setUsername }} />;
}

export default App;
