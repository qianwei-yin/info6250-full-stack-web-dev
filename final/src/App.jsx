import { useEffect } from 'react';
import './css/index.css';
import { useAppContext } from './context/context';
import { Navbar } from './components';

function App() {
	const { theme } = useAppContext();

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	return (
		<>
			<Navbar />
		</>
	);
}

export default App;
