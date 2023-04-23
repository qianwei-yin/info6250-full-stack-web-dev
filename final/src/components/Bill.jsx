import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { useTransactionContext } from '../context/transactionContext';
import { fetchBill } from '../services/transactionServices';
import { Loading } from '../components';
import { SET_LOADING_DASHBOARD } from '../scripts/actions/appActions';

const Bill = () => {
	const { catchErrorDuringUserAction, loggedIn, setPage, loadingDashboard, setLoading } = useAppContext();
	const {
		bill,
		setBill,
		pickedTimeOption,
		pickedTimeIndex,
		pickedTimeStartDate: startDate,
		pickedTimeEndDate: endDate,
	} = useTransactionContext();

	useEffect(() => {
		if (loggedIn) {
			setLoading({ type: SET_LOADING_DASHBOARD, value: true });
			fetchBill({ startDate, endDate })
				.then((data) => {
					setBill(data.bill);
				})
				.catch(catchErrorDuringUserAction)
				.finally(() => {
					setLoading({ type: SET_LOADING_DASHBOARD, value: false });
				});
		}
	}, [loggedIn, pickedTimeOption, pickedTimeIndex]);

	if (loadingDashboard) {
		return (
			<div className="center-child">
				<Loading size="3" color="indigo" />
			</div>
		);
	}

	if (Object.keys(bill.income).length === 0 && Object.keys(bill.expenses).length === 0) {
		return (
			<div className="no-transactions">
				There is no transaction at this time. Go to{' '}
				<span
					className="go-to-add"
					onClick={() => {
						setPage('add');
					}}
				>
					add
				</span>{' '}
				one!
			</div>
		);
	}

	return (
		<div className="bill__details">
			<div className="bill__details__categories">
				{Object.keys(bill).map((typeName) => {
					return (
						<div key={typeName}>
							<div className={`type-row ${typeName}`}>
								<span className="type-row__title">{typeName}</span>
								<span className={`type-row__sum ${typeName}`}>
									$
									{Object.values(bill[typeName])
										.reduce((acc, amo) => acc + amo, 0)
										.toFixed(2)}
								</span>
							</div>

							{Object.entries(bill[typeName]).map((el) => {
								return (
									<div key={el[0]} className="category-row">
										<span className="category-row__title">&emsp;{el[0]}</span>
										<span className="category-row__sum">${el[1].toFixed(2)}</span>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>

			<hr />

			<div className="bill__details__balance">
				<span className="balance-row__title">Balance</span>
				<span className="balance-row__sum">
					$
					{(
						Object.values(bill.income).reduce((acc, amo) => acc + amo, 0) -
						Object.values(bill.expenses).reduce((acc, amo) => acc + amo, 0)
					).toFixed(2)}
				</span>
			</div>
		</div>
	);
};

export default Bill;
