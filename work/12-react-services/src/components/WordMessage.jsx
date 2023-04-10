const WordMessage = ({ states }) => {
	const { username, storedWord } = states;

	return (
		<div className="content">
			<h2 className="content__text">
				<span className="content__name">{username}, </span>
				{storedWord ? 'your word is' : 'you have no word, add one!'}
			</h2>
			{storedWord ? <span className="content__word">{storedWord}</span> : ''}
		</div>
	);
};
export default WordMessage;
