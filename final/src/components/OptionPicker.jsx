import { useTransactionContext } from '../context/transactionContext';

const options = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

const OptionPicker = () => {
	const { pickedTimeOption, setPickedTimeOption } = useTransactionContext();

	return (
		<div className="option-picker">
			{options.map((el) => {
				return (
					<label key={el} className="option-picker__label">
						<input
							className="option-picker__input"
							type="radio"
							id={el}
							name="timePickerRadio"
							value={el}
							checked={pickedTimeOption === el}
							onChange={(e) => setPickedTimeOption(e.target.value)}
						/>
						<span>{el}</span>
					</label>
				);
			})}
		</div>
	);
};

export default OptionPicker;
