import { useUserContext } from '../context/userContext';
import { SettingsAddCard } from '../components';
import { useAppContext } from '../context/appContext';
import { Modal } from '../components';
import { useState } from 'react';
import { fetchUpdateDefaultAccount, fetchUpdateAccounts, fetchDefaultAccount } from '../services/accountServices';

const SettingsAccounts = () => {
	const { accounts, setAccounts, defaultAccount, setDefaultAccount } = useUserContext();
	const { showModal, openModal, closeModal, openPrompt, catchErrorDuringUserAction } = useAppContext();
	const [clickedItem, setClickedItem] = useState({});

	function handleClickDelete(e) {
		const { accountType, account } = e.target.dataset;
		if (account === 'uncategorized') {
			openPrompt({ promptType: 'warning', promptMsg: 'Actions on "uncategorized" are forbidden.' });
			return;
		}
		setClickedItem({ accountType, account });
		openModal();
	}

	function handleClickSetDefault(e) {
		const { accountType, account } = e.target.dataset;
		if (defaultAccount.accountType === accountType && defaultAccount.account === account) {
			openPrompt({
				promptType: 'success',
				promptMsg: `${accountType} - ${account} is already the default account!`,
			});
			return;
		}

		fetchUpdateDefaultAccount({ accountType, account })
			.then((data) => {
				setDefaultAccount(data.defaultAccount);
				openPrompt({
					promptType: 'success',
					promptMsg: `${accountType} - ${account} has been set to default account successfully!`,
				});
			})
			.catch(catchErrorDuringUserAction);
	}

	function handleDelete() {
		const { accountType, account } = clickedItem;
		fetchUpdateAccounts({ accountType, account, action: 'delete' })
			.then((data) => {
				setAccounts(data.accounts);

				// if the deleted one is default account, then change default account to uncategorized
				return fetchDefaultAccount();
			})
			.then((data) => {
				setDefaultAccount(data.defaultAccount);
			})
			.catch(catchErrorDuringUserAction)
			.finally(() => {
				closeModal();
			});
	}

	return (
		<div className="settings-section settings-section__accounts">
			{showModal ? (
				<Modal
					props={{
						defaultActionName: 'cancel',
						secondaryActionName: 'delete',
						defaultAction: closeModal,
						secondaryAction: handleDelete,
						messageTitle: 'delete',
						message:
							'This step cannot be undone and all transactions belong to this account will be changed to "uncategorized". And if this account is your default account, it will also be changed to "uncategorized".',
					}}
				/>
			) : null}
			{Object.keys(accounts).map((type) => {
				return (
					<div className="settings__single-type" key={type}>
						<h3 className="settings__type-title">{type}</h3>
						{accounts[type].map((el) => {
							return (
								<div
									className={`settings__card ${
										defaultAccount.accountType === type && defaultAccount.account === el
											? 'default'
											: ''
									}`}
									key={type + el}
								>
									<div>
										<p>
											{defaultAccount.accountType === type && defaultAccount.account === el
												? 'default - ' + el
												: el}
										</p>
									</div>
									<div>
										<button onClick={handleClickDelete} data-account-type={type} data-account={el}>
											delete
										</button>
										<button
											onClick={handleClickSetDefault}
											data-account-type={type}
											data-account={el}
										>
											set default
										</button>
									</div>
								</div>
							);
						})}
						<SettingsAddCard type={type} />
					</div>
				);
			})}
		</div>
	);
};
export default SettingsAccounts;
