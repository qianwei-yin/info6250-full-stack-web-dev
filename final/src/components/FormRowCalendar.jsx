const FormRowCalendar = ({ props: { label, name } }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-row__label">
				{label}
			</label>
			<input
				type="date"
				defaultValue={Intl.DateTimeFormat('fr-CA', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				}).format(new Date())}
				className="form-row__calendar"
			/>
		</div>
	);
};
export default FormRowCalendar;
