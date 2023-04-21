import { useState } from 'react';
import { useAppContext } from '../context/appContext';
import { useUserContext } from '../context/userContext';
import { fetchUpdateCategories } from '../services/categoryServices';
import { fetchUpdateAccounts } from '../services/accountServices';
import { ERRORS, ERROR_MESSAGES } from '../scripts/constants/errorConstants';
import { RESULTS, RESULT_MESSAGES } from '../scripts/constants/resultConstants';

const SettingsAddCard = ({ type }) => {
	const { catchErrorDuringUserAction, openPrompt } = useAppContext();
	const { categories, setCategories, accounts, setAccounts } = useUserContext();
	const [newItemInput, setNewItemInput] = useState('');

	function handleAdd() {
		if (newItemInput.toLowerCase() === 'uncategorized') {
			// Here using NOT_ALLOWED_ACCOUNT or NOT_ALLOWED_CATEGORY_NAME are both accepted
			openPrompt({ promptType: 'warning', promptMsg: ERROR_MESSAGES[ERRORS.NOT_ALLOWED_ACCOUNT] });
			setNewItemInput('');
			return;
		}

		if (type === 'income' || type === 'expenses') {
			if (categories[type].includes(newItemInput)) {
				openPrompt({ promptType: 'warning', promptMsg: ERROR_MESSAGES[ERRORS.DUPLICATE_CATEGORY_NAME] });
				setNewItemInput('');
				return;
			}

			fetchUpdateCategories({ type, categoryName: newItemInput, action: 'add' })
				.then((data) => {
					setCategories(data.categories);
					openPrompt({ promptType: 'success', promptMsg: RESULT_MESSAGES[RESULTS.ADD_CATEGORY_SUCCESS] });
				})
				.catch(catchErrorDuringUserAction)
				.finally(() => setNewItemInput(''));
		} else {
			if (accounts[type].includes(newItemInput)) {
				openPrompt({ promptType: 'warning', promptMsg: ERROR_MESSAGES[ERRORS.DUPLICATE_ACCOUNT] });
				setNewItemInput('');
				return;
			}

			fetchUpdateAccounts({ accountType: type, account: newItemInput, action: 'add' })
				.then((data) => {
					setAccounts(data.accounts);
					openPrompt({ promptType: 'success', promptMsg: RESULT_MESSAGES[RESULTS.ADD_ACCOUNT_SUCCESS] });
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
			<button className="settings__add-card__button" onClick={handleAdd} disabled={!newItemInput}>
				+
			</button>
		</div>
	);
};

export default SettingsAddCard;
