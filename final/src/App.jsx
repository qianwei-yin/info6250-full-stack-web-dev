import { useState, useEffect } from 'react';
import './css/index.css';

import { ThemeToggler, TransactionItem } from './components';

function App() {
	const [theme, setTheme] = useState('light-theme');

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	const transaction = { amount: 100, category: 'clothes', time: new Date(), type: 'expense' };

	return (
		<>
			<ThemeToggler setTheme={setTheme} />
			<TransactionItem transaction={transaction} />
		</>
	);
}

export default App;
