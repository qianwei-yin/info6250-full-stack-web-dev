const Warning = ({ warningParams }) => {
	const { showWarning, warningMsg } = warningParams;

	if (!showWarning) return '';
	return (
		<p className="warning" id="login-warning">
			{warningMsg}
		</p>
	);
};
export default Warning;
