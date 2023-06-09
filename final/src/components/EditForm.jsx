import { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { useUserContext } from '../context/userContext';
import { useTransactionContext } from '../context/transactionContext';
import { FormRowSelect, FormRowInput, FormRowCalendar, Modal, Loading } from '../components';
import validateTransaction from '../scripts/utils/validateTransaction';
import {
	fetchCreateTransaction,
	fetchUpdateTransaction,
	fetchDeleteTransaction,
} from '../services/transactionServices';
import { formatTimeForServer } from '../scripts/utils/time';
import { RESULTS, RESULT_MESSAGES } from '../scripts/constants/resultConstants';
import {
	SET_LOADING_TRANSACTIONS_DELETE,
	SET_LOADING_TRANSACTION_ADD,
	SET_LOADING_TRANSACTION_UPDATE,
} from '../scripts/actions/appActions';

const initialInputState = {
	id: '',
	amount: '',
	type: '',
	category: '',
	time: formatTimeForServer(),
	description: '',
	accountType: '',
	account: '',
};

const EditForm = () => {
	const {
		openPrompt,
		catchErrorDuringUserAction,
		showModal,
		openModal,
		closeModal,
		setPage,
		setSettingsSection,
		loadingTransactionsDelete,
		loadingTransactionAdd,
		loadingTransactionUpdate,
		setLoading,
	} = useAppContext();
	const { transactions, refreshTransactions, chosenTransactionId } = useTransactionContext();
	const { categories, accounts, defaultAccount } = useUserContext();
	const [inputs, setInputs] = useState({ ...initialInputState, time: formatTimeForServer() });

	function setToInitialInputs() {
		setInputs({
			...initialInputState,
			time: formatTimeForServer(),
			accountType: defaultAccount.accountType,
			account: defaultAccount.account,
		});
	}

	useEffect(() => {
		if (chosenTransactionId === '') {
			setToInitialInputs();
		}
		if (chosenTransactionId !== '') {
			const edittingTransaction = transactions.find((el) => el.id === chosenTransactionId);
			setInputs({ ...edittingTransaction });
		}
	}, [chosenTransactionId]);

	function handleInput(e) {
		const { name, value } = e.target;
		setInputs((oldInputs) => {
			return { ...oldInputs, [name]: value };
		});
		if (name === 'type') {
			setInputs((oldInputs) => {
				return { ...oldInputs, category: '' };
			});
		}
		if (name === 'accountType') {
			setInputs((oldInputs) => {
				return { ...oldInputs, account: '' };
			});
		}
	}

	function handleCancel() {
		setToInitialInputs();
	}

	function handleSubmitNew() {
		const result = validateTransaction(inputs);
		if (!result.ok) {
			openPrompt({ promptType: 'warning', promptMsg: result.msg });
			return;
		}

		setLoading({ type: SET_LOADING_TRANSACTION_ADD, value: true });
		fetchCreateTransaction(inputs)
			.then((data) => {
				// refresh the transaction items on the left
				refreshTransactions();
				setToInitialInputs();
				// open success propmt
				openPrompt({ promptType: 'success', promptMsg: RESULT_MESSAGES[RESULTS.ADD_TRANSACTION_SUCCESS] });
			})
			.catch(catchErrorDuringUserAction)
			.finally(() => setLoading({ type: SET_LOADING_TRANSACTION_ADD, value: false }));
	}

	function handleSubmitUpdate() {
		const result = validateTransaction(inputs);
		if (!result.ok) {
			openPrompt({ promptType: 'warning', promptMsg: result.msg });
			return;
		}

		setLoading({ type: SET_LOADING_TRANSACTION_UPDATE, value: true });
		fetchUpdateTransaction(inputs)
			.then((data) => {
				// refresh the transaction items on the left
				refreshTransactions();
				// open success propmt
				openPrompt({ promptType: 'success', promptMsg: RESULT_MESSAGES[RESULTS.UPDATE_TRANSACTION_SUCCESS] });
			})
			.catch(catchErrorDuringUserAction)
			.finally(() => setLoading({ type: SET_LOADING_TRANSACTION_UPDATE, value: false }));
	}

	function handleDelete() {
		setLoading({ type: SET_LOADING_TRANSACTIONS_DELETE, value: true });
		fetchDeleteTransaction(chosenTransactionId)
			.then((data) => {
				setToInitialInputs();
				refreshTransactions();
				// success prompt
				openPrompt({ promptType: 'success', promptMsg: RESULT_MESSAGES[RESULTS.DELETE_TRANSACTION_SUCCESS] });
			})
			.catch(catchErrorDuringUserAction)
			.finally(() => {
				setLoading({ type: SET_LOADING_TRANSACTIONS_DELETE, value: false });
				closeModal();
			});
	}

	function goSettings(section) {
		setSettingsSection(section);
		setPage('settings');
	}

	return (
		<div className="edit-box">
			{showModal ? (
				<Modal
					props={{
						loading: loadingTransactionsDelete,
						defaultActionName: 'cancel',
						secondaryActionName: 'delete',
						defaultAction: closeModal,
						secondaryAction: handleDelete,
						messageTitle: 'delete',
						message: 'Are you sure you want to delete this transaction? This step cannot be undone.',
					}}
				/>
			) : null}
			<p className="edit-area__title">{chosenTransactionId === '' ? 'Create new one' : 'Details'}</p>
			<div className="edit-area">
				<FormRowSelect
					props={{
						name: 'type',
						label: 'type',
						options: ['income', 'expenses'],
						value: inputs.type,
						handleInput,
					}}
				/>
				<FormRowSelect
					props={{
						name: 'category',
						label: 'category',
						options: categories[inputs.type] || [],
						value: inputs.category,
						handleInput,
					}}
				/>
				<p className="go-to-settings">
					Didn't found your expected category? Go to{' '}
					<button onClick={() => goSettings('categories')}>Settings</button>!
				</p>
				<FormRowInput
					props={{ name: 'amount', label: 'amount', type: 'number', value: inputs.amount, handleInput }}
				/>
				<FormRowCalendar props={{ label: 'transaction time', name: 'time', value: inputs.time, handleInput }} />

				<FormRowSelect
					props={{
						name: 'accountType',
						label: 'account type',
						options: Object.keys(accounts),
						value: inputs.accountType,
						handleInput,
					}}
				/>
				<FormRowSelect
					props={{
						name: 'account',
						label: 'account',
						options: accounts[inputs.accountType] || [],
						value: inputs.account,
						handleInput,
					}}
				/>
				<p className="go-to-settings">
					Want another account? Go to <button onClick={() => goSettings('accounts')}>Settings</button>!
				</p>
				<FormRowInput
					props={{
						name: 'description',
						label: 'description (optional)',
						type: 'text',
						value: inputs.description,
						handleInput,
						longText: true,
					}}
				/>
			</div>
			{chosenTransactionId === '' ? (
				<div className="edit-area__actions">
					<button className="btn--with-border edit-area__actions__cancel" onClick={handleCancel}>
						Cancel
					</button>
					<button className="btn--with-border edit-area__actions__submit" onClick={handleSubmitNew}>
						{loadingTransactionAdd ? <Loading size="1" color="indigo" /> : 'Submit'}
					</button>
				</div>
			) : (
				<div className="edit-area__actions">
					<button className="btn--with-border edit-area__actions__delete" onClick={openModal}>
						Delete
					</button>
					<button className="btn--with-border edit-area__actions__update" onClick={handleSubmitUpdate}>
						{loadingTransactionUpdate ? <Loading size="1" color="indigo" /> : 'Update'}
					</button>
				</div>
			)}
		</div>
	);
};

export default EditForm;
