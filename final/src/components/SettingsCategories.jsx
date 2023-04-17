import { useUserContext } from '../context/userContext';
import { SettingsAddCard } from '../components';

const SettingsCategories = () => {
	const { categories } = useUserContext();

	return (
		<div className="settings-section settings-section__categories">
			{Object.keys(categories).map((type) => {
				return (
					<div className="settings__single-type">
						<h3 className="settings__type-title">{type}</h3>
						{categories[type].map((el) => {
							return (
								<div className="settings__card" key={el}>
									<div>
										<p>{el}</p>
									</div>
									<div>
										<button>delete</button>
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

export default SettingsCategories;
