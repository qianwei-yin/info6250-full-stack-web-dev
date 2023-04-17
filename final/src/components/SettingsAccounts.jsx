import { useUserContext } from '../context/userContext';
import { SettingsAddCard } from '../components';

const SettingsAccounts = () => {
	const { accounts } = useUserContext();

	return (
		<div className="settings-section settings-section__accounts">
			{Object.keys(accounts).map((type) => {
				return (
					<div className="settings__single-type">
						<h3 className="settings__type-title">{type}</h3>
						{accounts[type].map((el) => {
							return (
								<div className="settings__card" key={el.id}>
									<div>
										<p>{el.name}</p>
									</div>
									<div>
										<button>delete</button>
										<button>set default</button>
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
