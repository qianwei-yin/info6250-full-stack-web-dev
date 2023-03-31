import { useState, useEffect } from 'react';
import './css/index.css';

import { FormRowInput, FormRowSelect, FormRowCalendar } from './components';

function App() {
	const [theme, setTheme] = useState('light-theme');

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	return (
		<form>
			<FormRowInput
				props={{
					label: 'Username',
					name: 'username',
					type: 'text',
				}}
			/>
			<FormRowSelect
				props={{
					label: 'Hello',
					name: 'helloWord',
					options: ['hello', 'world', 'python', 'nihao'],
				}}
			/>
			<FormRowCalendar props={{ label: 'Add Date', name: 'addDate' }} />
		</form>
	);
}

export default App;
