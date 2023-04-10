const FormRowInput = ({ props: { name, label, type, handleInput, value, longText = false } }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-row__label">
				{label}
			</label>
			{longText ? (
				<textarea
					id={name}
					name={name}
					type={type}
					className="form-row__input"
					onInput={handleInput}
					value={value}
					rows="4"
				/>
			) : (
				<input
					id={name}
					name={name}
					type={type}
					className="form-row__input"
					onInput={handleInput}
					value={value}
				/>
			)}
		</div>
	);
};

export default FormRowInput;
