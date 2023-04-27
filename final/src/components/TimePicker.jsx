import { useTransactionContext } from '../context/transactionContext';
import { ReactComponent as Left } from '../icons/angle-left-solid.svg';
import { ReactComponent as Right } from '../icons/angle-right-solid.svg';

const TimePicker = () => {
	const { pickedCurrentTime, setPickedTimeIndex } = useTransactionContext();

	return (
		<div className="time-picker">
			<span className="time-picker--left">
				<Left className="icon" onClick={() => setPickedTimeIndex('backwards')} />
			</span>
			<span className="current-time">{pickedCurrentTime}</span>
			<span className="time-picker--right">
				<Right className="icon" onClick={() => setPickedTimeIndex('forwards')} />
			</span>
		</div>
	);
};

export default TimePicker;
