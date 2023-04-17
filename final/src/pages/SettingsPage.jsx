import { useState } from 'react';
import { useUserContext } from '../context/userContext';
import { AddCategory, SettingsAccounts, SettingsCategories, SettingsOthers } from '../components';

const settingsSection = ['categories', 'accounts', 'others'];

const SettingsPage = () => {
	const { categories } = useUserContext();

	const [settingsSectionName, setSettingsSectionName] = useState('categories');

	return (
		<div className="settings-page">
			<div className="sidebar">
				{settingsSection.map((el) => {
					return (
						<button key={el} className="sidebar__btn" onClick={() => setSettingsSectionName(el)}>
							{el}
						</button>
					);
				})}
			</div>

			{/* IFFE, if use ternary operator to do the conditional rendering, the syntax can be complex and confusing  */}
			{(() => {
				if (settingsSectionName === 'categories') return <SettingsCategories />;
				else if (settingsSectionName === 'accounts') return <SettingsAccounts />;
				else return <div className="settings-section"></div>;
			})()}
		</div>
	);
};

export default SettingsPage;
