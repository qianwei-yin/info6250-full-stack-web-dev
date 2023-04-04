const FormRowInput = ({ props: { name, label, type } }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-row__label">
				{label}
			</label>
			<input id={name} name={name} type={type} className="form-row__input" />
		</div>
	);
};

export default FormRowInput;
