import { useState } from 'react';
import { fetchUpdateWord } from '../services';
import Loading from './Loading';
import { ERROR_MESSAGES } from '../errorConstant';

const WordForm = ({ states, setStates }) => {
	const [isUpdateWordLoading, setIsUpdateWordLoading] = useState(false);
	const [wordInput, setWordInput] = useState('');
	const { storedWord } = states;

	function handleSubmit(e) {
		e.preventDefault();

		// before fetching
		setIsUpdateWordLoading(true);
		setStates((oldStates) => {
			return {
				...oldStates,
				warningParams: {
					showWarning: false,
					warningMsg: '',
				},
			};
		});

		fetchUpdateWord(wordInput)
			.then((data) => {
				setStates((oldStates) => {
					return {
						...oldStates,
						storedWord: data.storedWord,
					};
				});
			})
			.catch((err) => {
				setStates((oldStates) => {
					return {
						...oldStates,
						warningParams: {
							showWarning: true,
							warningMsg: ERROR_MESSAGES[err.error] || ERROR_MESSAGES.default,
						},
					};
				});
			})
			.finally(() => {
				setIsUpdateWordLoading(false);
				setWordInput('');
			});
	}

	return (
		<form className="form change-form" onSubmit={handleSubmit}>
			<h3 className="change-text">
				{isUpdateWordLoading ? <Loading /> : `Wanna ${storedWord ? 'Change' : 'Add'}?`}
			</h3>

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
			<button className="btn btn--submit btn--new-word" type="submit" disabled={isUpdateWordLoading}>
				submit
			</button>
		</form>
	);
};

export default WordForm;
