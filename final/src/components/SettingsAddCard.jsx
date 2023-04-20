import { useState } from 'react';
import { useAppContext } from '../context/appContext';
import { useUserContext } from '../context/userContext';
import { fetchUpdateCategories } from '../services/categoryServices';
import { fetchUpdateAccounts } from '../services/accountServices';

const SettingsAddCard = ({ type }) => {
	const { catchErrorDuringUserAction, openPrompt } = useAppContext();
	const { categories, setCategories, accounts, setAccounts } = useUserContext();
	const [newItemInput, setNewItemInput] = useState('');

	function handleAdd() {
		if (type === 'income' || type === 'expenses') {
			if (categories[type].includes(newItemInput)) {
				openPrompt({ promptType: 'warning', promptMsg: 'This category already exists.' });
				return;
			}

			fetchUpdateCategories({ type, categoryName: newItemInput, action: 'add' })
				.then((data) => {
					setCategories(data.categories);
				})
				.catch(catchErrorDuringUserAction)
				.finally(() => setNewItemInput(''));
		} else {
			if (accounts[type].includes(newItemInput)) {
				openPrompt({ promptType: 'warning', promptMsg: 'This account already exists.' });
				return;
			}

			fetchUpdateAccounts({ accountType: type, account: newItemInput, action: 'add' })
				.then((data) => {
					setAccounts(data.accounts);
				})
				.catch(catchErrorDuringUserAction)
				.finally(() => setNewItemInput(''));
		}
	}

	return (
		<div className="settings__add-card">
			<input
				id="newCategory"
				name="newCategory"
				type="text"
				className="settings__add-card__input"
				onInput={(e) => setNewItemInput(e.target.value)}
				value={newItemInput}
			/>
			<button className="settings__add-card__button" onClick={handleAdd}>
				+
			</button>
		</div>
	);
};

export default SettingsAddCard;
