import Navbar from './Navbar';
import WordForm from './WordForm';
import WordMessage from './WordMessage';

const Home = ({ states, setStates }) => {
	return (
		<div className="home-section">
			<Navbar states={states} setStates={setStates} />

			<WordMessage states={states} />

			<WordForm states={states} setStates={setStates} />
		</div>
	);
};
export default Home;
