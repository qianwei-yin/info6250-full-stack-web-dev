import { useState } from 'react';
import { useUserContext } from '../context/userContext';
import { useAppContext } from '../context/appContext';
import { AddCategory, SettingsAccounts, SettingsCategories } from '../components';

const settingsSections = ['categories', 'accounts'];

const SettingsPage = () => {
	const { categories } = useUserContext();
	const { settingsSection, setSettingsSection } = useAppContext();
	const [clickedItemType, setClickedItemType] = useState('');

	return (
		<div className="settings-page">
			<div className="sidebar">
				{settingsSections.map((el) => {
					return (
						<div className={`sidebar__item ${settingsSection === el ? 'active' : ''}`} key={el}>
							<button key={el} className="sidebar__btn" onClick={() => setSettingsSection(el)}>
								{el}
							</button>
						</div>
					);
				})}
			</div>

			{/* For future coding: If there are multiple consitional rendering, IFFE is the best. If use ternary operator to do the conditional rendering, the syntax can be complex and confusing, e.g.⬇️ */}
			{/* {(() => {
				if (settingsSection === 'categories') return <SettingsCategories />;
				else if (settingsSection === 'accounts') return <SettingsAccounts />;
			})()}
			 */}

			{settingsSection === 'categories' ? (
				<SettingsCategories clickedItemType={clickedItemType} setClickedItemType={setClickedItemType} />
			) : (
				<SettingsAccounts clickedItemType={clickedItemType} setClickedItemType={setClickedItemType} />
			)}
		</div>
	);
};

export default SettingsPage;
