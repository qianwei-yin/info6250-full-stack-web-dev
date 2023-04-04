import { useState } from 'react';

const WordForm = ({ states, setStates }) => {
	const { storedWord } = states;

	const [wordInput, setWordInput] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		console.log('yes');
	}

	return (
		<form className="form change-form" onSubmit={handleSubmit}>
			<h3 className="change-text">Wanna {storedWord ? 'Change' : 'Add'}?</h3>
			<div className="form-row">
				<label htmlFor="word" className="form-label">
					your new word
				</label>
				<input
					type="text"
					className="form-input input--word"
					name="word"
					value={wordInput}
					onInput={(e) => setWordInput(e.target.value)}
				/>
			</div>
			<button className="btn btn--submit btn--new-word" type="submit">
				submit
			</button>
		</form>
	);
};

export default WordForm;
