import categories from '../scripts/categories';

const TransactionItem = ({ transaction }) => {
	const { amount, category, time, type } = transaction;

	return (
		<div className="transaction-item">
			<div className="transaction-item__icon">
				{categories[category] ? categories[category] : categories['default']}
			</div>
			<span className="transaction-item__category">{category}</span>
			{/*  // Friday, Dec 27 */}
			<span className="transaction-item__date">
				{Intl.DateTimeFormat(navigator.language, {
					weekday: 'short',
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				}).format(time)}
			</span>
			<span className={`transaction-item__amount ${type}`}>${amount.toFixed(2)}</span>
		</div>
	);
};

export default TransactionItem;
