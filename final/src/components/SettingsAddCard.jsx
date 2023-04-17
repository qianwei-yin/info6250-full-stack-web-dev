import { useState } from 'react';

const SettingsAddCard = ({ type }) => {
	const [newCategoryInput, setNewCategoryInput] = useState('');

	return (
		<div className="settings__add-card">
			<input
				id="newCategory"
				name="newCategory"
				type="text"
				className="settings__add-card__input"
				onInput={(e) => setNewCategoryInput(e.target.value)}
				value={newCategoryInput}
			/>
			<button className="settings__add-card__button">+</button>
		</div>
	);
};

export default SettingsAddCard;
