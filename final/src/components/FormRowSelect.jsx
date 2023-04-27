const FormRowSelect = ({ props: { name, label, options, value, handleInput } }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-row__label">
				{label}
			</label>
			<select name={name} id={name} value={value} className="form-row__select" onChange={handleInput}>
				<option value="" disabled>{`Please choose one...`}</option>
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
