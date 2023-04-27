const Loading = ({ size, color }) => {
	return (
		<div className={`loading loading--size-${size} loading--color-${color}`}>
			<div className="loading__circle"></div>
			<div className="loading__circle"></div>
			<div className="loading__circle"></div>
			<div className="loading__circle"></div>
		</div>
	);
};

export default Loading;
