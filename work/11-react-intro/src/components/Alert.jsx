const Alert = ({ state: { alertParams } }) => {
	return (
		<div className={alertParams.showAlert ? `alert show-alert alert--${alertParams.alertType}` : ''}>
			{alertParams.alertMsg}
		</div>
	);
};

export default Alert;
