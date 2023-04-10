import { OptionPicker, TimePicker, Bill } from '../components';

const DashboardPage = () => {
	return (
		<div className="dashboard-page">
			<OptionPicker />
			<TimePicker />

			<Bill />
		</div>
	);
};

export default DashboardPage;
