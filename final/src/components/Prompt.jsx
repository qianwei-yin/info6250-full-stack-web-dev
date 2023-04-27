import { ReactComponent as Warning } from '../icons/circle-exclamation-solid.svg';
import { ReactComponent as Success } from '../icons/circle-check-solid.svg';

const Prompt = ({ type, msg }) => {
	const msgParas = msg.split('\n');

	return (
		<div className="prompt-card">
			<div className={`prompt ${type}`}>
				{type === 'warning' ? <Warning className="prompt-icon" /> : <Success className="prompt-icon" />}
				<div>
					{msgParas.map((el) => (
						<p key={el}>{el}</p>
					))}
				</div>
			</div>
			<div className="prompt__progress-bar"></div>
		</div>
	);
};

export default Prompt;
