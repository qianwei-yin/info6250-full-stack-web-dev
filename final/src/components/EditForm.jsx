import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useUserContext } from '../context/userContext';
import { useTransactionContext } from '../context/transactionContext';
import { FormRowSelect, FormRowInput, FormRowCalendar } from '../components';

const initialInputState = {
	id: '',
	amount: '',
	type: '',
	category: '',
	time: dayjs().format('YYYY-MM-DD[T]HH:mm'),
	description: '',
	accountType: '',
	account: '',
};

const EditForm = ({ chosenTransaction }) => {
	const { transactions } = useTransactionContext();
	const { categories, accounts } = useUserContext();

	const [inputs, setInputs] = useState({ ...initialInputState, time: dayjs().format('YYYY-MM-DD[T]HH:mm') });

	useEffect(() => {
		console.log(chosenTransaction);
		if (chosenTransaction === '') {
			setInputs({
				...initialInputState,
				time: dayjs().format('YYYY-MM-DD[T]HH:mm'),
			});
		}
		if (chosenTransaction !== '') {
			const edittingTransaction = transactions.find((el) => el.id === chosenTransaction);
			setInputs({ ...edittingTransaction });
		}
	}, [chosenTransaction]);

	function handleInput(e) {
		const { name, value } = e.target;
		console.log(name, value);
		setInputs((oldInputs) => {
			return { ...oldInputs, [name]: value };
		});
	}

	return (
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
					options: inputs.accountType ? accounts[inputs.accountType].map((el) => el.name) : [],
					value: inputs.account,
					handleInput,
				}}
			/>
			<FormRowInput
				props={{
					name: 'description',
					label: 'description',
					type: 'text',
					value: inputs.description,
					handleInput,
					longText: true,
				}}
			/>
		</div>
	);
};

export default EditForm;
