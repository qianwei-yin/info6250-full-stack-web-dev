import Calendar from 'react-calendar';
// https://www.npmjs.com/package/react-calendar

const FormRowCalendar = ({ props: { label, name } }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-row__label">
				{label}
			</label>
			<Calendar />
		</div>
	);
};
export default FormRowCalendar;
