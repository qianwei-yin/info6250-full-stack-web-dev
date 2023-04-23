import { useUserContext } from '../context/userContext';
import { SettingsAddCard } from '../components';
import { useAppContext } from '../context/appContext';
import { Modal } from '../components';
import { useState } from 'react';
import { fetchUpdateDefaultAccount, fetchUpdateAccounts, fetchDefaultAccount } from '../services/accountServices';
import { ERRORS, ERROR_MESSAGES } from '../scripts/constants/errorConstants';
import { RESULTS, RESULT_MESSAGES } from '../scripts/constants/resultConstants';
import { SET_LOADING_SETTINGS_DELETE } from '../scripts/actions/appActions';

const SettingsAccounts = ({ clickedItemType, setClickedItemType }) => {
	const { accounts, setAccounts, defaultAccount, setDefaultAccount } = useUserContext();
	const {
		showModal,
		openModal,
		closeModal,
		openPrompt,
		catchErrorDuringUserAction,
		loadingSettingsDelete,
		setLoading,
	} = useAppContext();
	const [clickedItem, setClickedItem] = useState({});

	function handleClickDelete(e) {
		const { accountType, account } = e.target.dataset;
		if (account === 'uncategorized') {
			openPrompt({
				promptType: 'warning',
				promptMsg: ERROR_MESSAGES[ERRORS.NOT_ALLOWED_ACCOUNT] || ERROR_MESSAGES.default,
			});
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
				promptMsg: `"${accountType} - ${account}"` + RESULT_MESSAGES[RESULTS.ALREADY_DEFAULT_ACCOUNT],
			});
			return;
		}

		fetchUpdateDefaultAccount({ accountType, account })
			.then((data) => {
				setDefaultAccount(data.defaultAccount);
				openPrompt({
					promptType: 'success',
					promptMsg: `"${accountType} - ${account}"` + RESULT_MESSAGES[RESULTS.SET_DEFAULT_ACCOUNT_SUCCESS],
				});
			})
			.catch(catchErrorDuringUserAction);
	}

	function handleDelete() {
		const { accountType, account } = clickedItem;

		setLoading({ type: SET_LOADING_SETTINGS_DELETE, value: true });
		fetchUpdateAccounts({ accountType, account, action: 'delete' })
			.then((data) => {
				setAccounts(data.accounts);

				// get default account, and if the deleted one is default account, then change default account to uncategorized
				return fetchDefaultAccount();
			})
			.then((data) => {
				let tempMsg = '';
				if (JSON.stringify(data.defaultAccount) !== JSON.stringify(defaultAccount)) {
					setDefaultAccount(data.defaultAccount);
					tempMsg =
						`"${data.defaultAccount.accountType} - ${data.defaultAccount.account}"` +
						RESULT_MESSAGES[RESULTS.SET_DEFAULT_ACCOUNT_AUTOMATICALLY];
				}
				openPrompt({
					promptType: 'success',
					promptMsg: RESULT_MESSAGES[RESULTS.DELETE_ACCOUNT_SUCCESS] + tempMsg,
				});
			})
			.catch(catchErrorDuringUserAction)
			.finally(() => {
				setLoading({ type: SET_LOADING_SETTINGS_DELETE, value: false });
				closeModal();
			});
	}

	return (
		<div className="settings-section settings-section__accounts">
			{showModal ? (
				<Modal
					props={{
						loading: loadingSettingsDelete,
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
								<div className="settings__card" key={type + el}>
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
						<SettingsAddCard
							type={type}
							clickedItemType={clickedItemType}
							setClickedItemType={setClickedItemType}
						/>
					</div>
				);
			})}
		</div>
	);
};
export default SettingsAccounts;
