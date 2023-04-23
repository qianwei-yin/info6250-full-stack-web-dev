import { useState } from 'react';
import { useUserContext } from '../context/userContext';
import { SettingsAddCard, Modal } from '../components';
import { fetchUpdateCategories } from '../services/categoryServices';
import { useAppContext } from '../context/appContext';
import { ERRORS, ERROR_MESSAGES } from '../scripts/constants/errorConstants';
import { RESULTS, RESULT_MESSAGES } from '../scripts/constants/resultConstants';
import { SET_LOADING_SETTINGS_DELETE } from '../scripts/actions/appActions';

const SettingsCategories = ({ clickedItemType, setClickedItemType }) => {
	const { categories, setCategories } = useUserContext();
	const {
		catchErrorDuringUserAction,
		showModal,
		openModal,
		closeModal,
		openPrompt,
		loadingSettingsDelete,
		setLoading,
	} = useAppContext();
	const [clickedItem, setClickedItem] = useState({});

	function handleClickDelete(e) {
		const { type, categoryName } = e.target.dataset;
		if (categoryName === 'uncategorized') {
			openPrompt({ promptType: 'warning', promptMsg: ERROR_MESSAGES[ERRORS.NOT_ALLOWED_CATEGORY_NAME] });
			return;
		}
		setClickedItem({ type, categoryName });
		openModal();
	}

	function handleDelete() {
		setLoading({ type: SET_LOADING_SETTINGS_DELETE, value: true });
		fetchUpdateCategories({ ...clickedItem, action: 'delete' })
			.then((data) => {
				setCategories(data.categories);
				openPrompt({ promptType: 'success', promptMsg: RESULT_MESSAGES[RESULTS.DELETE_CATEGORY_SUCCESS] });
			})
			.catch(catchErrorDuringUserAction)
			.finally(() => {
				setLoading({ type: SET_LOADING_SETTINGS_DELETE, value: false });
				closeModal();
			});
	}

	return (
		<div className="settings-section settings-section__categories">
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
							'This step cannot be undone and all transactions belong to this category will be changed to "uncategorized".',
					}}
				/>
			) : null}
			{Object.keys(categories).map((type) => {
				return (
					<div className="settings__single-type" key={type}>
						<h3 className="settings__type-title">{type}</h3>
						{categories[type].map((el) => {
							return (
								<div className="settings__card" key={el}>
									<div>
										<p>{el}</p>
									</div>
									<div>
										<button data-type={type} data-category-name={el} onClick={handleClickDelete}>
											delete
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

export default SettingsCategories;
