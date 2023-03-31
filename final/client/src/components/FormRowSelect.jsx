const FormRowSelect = ({ props: { name, label, options } }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-row__label">
				{label}
			</label>
			<select name={name} id={name} className="form-row__select">
				<option value="" selected disabled>{`Please choose one...`}</option>
				{options.map((el) => {
					return (
						<option key={el} value={el}>
							{el}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default FormRowSelect;
