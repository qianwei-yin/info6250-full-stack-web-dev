import { useState } from 'react';
import { useUserContext } from '../context/userContext';
import { SettingsAddCard, Modal } from '../components';
import { fetchUpdateCategories } from '../services/categoryServices';
import { useAppContext } from '../context/appContext';

const SettingsCategories = () => {
	const { categories, setCategories } = useUserContext();
	const { catchErrorDuringUserAction, showModal, openModal, closeModal, openPrompt } = useAppContext();
	const [clickedItem, setClickedItem] = useState({});

	function handleClickDelete(e) {
		const { type, categoryName } = e.target.dataset;
		if (categoryName === 'uncategorized') {
			openPrompt({ promptType: 'warning', promptMsg: 'Actions on "uncategorized" are forbidden.' });
			return;
		}
		setClickedItem({ type, categoryName });
		openModal();
	}

	function handleDelete() {
		fetchUpdateCategories({ ...clickedItem, action: 'delete' })
			.then((data) => {
				setCategories(data.categories);
			})
			.catch(catchErrorDuringUserAction)
			.finally(() => closeModal());
	}

	return (
		<div className="settings-section settings-section__categories">
			{showModal ? (
				<Modal
					props={{
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
						<SettingsAddCard type={type} />
					</div>
				);
			})}
		</div>
	);
};

export default SettingsCategories;
