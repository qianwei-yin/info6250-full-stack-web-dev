const FormRowCalendar = ({ props: { label, name, value, handleInput } }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-row__label">
				{label}
			</label>
			<input
				id={name}
				name={name}
				type="datetime-local"
				value={value}
				className="form-row__calendar"
				onChange={handleInput}
			/>
		</div>
	);
};
export default FormRowCalendar;
