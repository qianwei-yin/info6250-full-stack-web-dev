const Prompt = ({ type, msg }) => {
	return <p className={`prompt ${type}`}>{msg}</p>;
};

export default Prompt;
