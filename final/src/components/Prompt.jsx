import { ReactComponent as Warning } from '../icons/circle-exclamation-solid.svg';
import { ReactComponent as Success } from '../icons/circle-check-solid.svg';

const Prompt = ({ type, msg }) => {
	return (
		<div className="prompt-card">
			<p className={`prompt ${type}`}>
				{type === 'warning' ? <Warning className="prompt-icon" /> : <Success className="prompt-icon" />}
				{msg}
			</p>
			<div className="prompt__progress-bar"></div>
		</div>
	);
};

export default Prompt;
