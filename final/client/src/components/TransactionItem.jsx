import moment from 'moment';
import categories from '../scripts/categories';

const TransactionItem = ({ transaction }) => {
	const { amount, category, time, type } = transaction;

	return (
		<div className="transaction-item">
			<div className="transaction-item__icon">
				{categories[category] ? categories[category] : categories['default']}
			</div>
			<span className="transaction-item__category">{category}</span>
			<span className="transaction-item__date">{moment(time).format('ddd, ll')}</span>
			<span className={`transaction-item__amount ${type}`}>${amount.toFixed(2)}</span>
		</div>
	);
};

export default TransactionItem;
