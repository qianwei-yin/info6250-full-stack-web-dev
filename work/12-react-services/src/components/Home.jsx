import { useState } from 'react';
import Navbar from './Navbar';
import Warning from './Warning';
import WordForm from './WordForm';
import WordMessage from './WordMessage';

const Home = ({ states, setStates }) => {
	const [isWordFetchLoading, setIsWordFetchLoading] = useState(false);
	const { loggedIn, warningParams } = states;

	return (
		<div className="home-section">
			<Navbar states={states} setStates={setStates} />

			<Warning warningParams={warningParams} />

			<WordMessage states={states} setStates={setStates} />

			<WordForm states={states} setStates={setStates} />
		</div>
	);
};
export default Home;
