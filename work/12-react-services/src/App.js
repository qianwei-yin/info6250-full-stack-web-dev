import { useState } from 'react';
import './app.css';
import Home from './components/Home';
import Login from './components/Login';

function App() {
	const [states, setStates] = useState({
		loggedIn: true,
		username: 'abc',
		storedWord: 'gooood',
		warningParams: {
			showWarning: false,
			warningType: '',
			warningMsg: '',
		},
	});

	if (states.loggedIn) return <Home states={states} setStates={setStates} />;
	return <Login states={states} setStates={setStates} />;
}

export default App;
