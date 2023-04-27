import Loading from './Loading';

const Modal = ({
	props: { loading, defaultActionName, secondaryActionName, defaultAction, secondaryAction, messageTitle, message },
}) => {
	return (
		<>
			<div className="modal">
				{loading ? (
					<div className="modal__title modal__title--loading">
						<Loading size="2" color="amber" />
					</div>
				) : (
					<h2 className="modal__title">{messageTitle}</h2>
				)}

				<p className="modal__message">{message}</p>
				<div className="modal__actions">
					<button onClick={secondaryAction} className="modal__actions--secondary">
						{secondaryActionName}
					</button>
					<button form="modal" onClick={defaultAction} className="modal__actions--default">
						{defaultActionName}
					</button>
				</div>
			</div>
			<div className="overlay"></div>
		</>
	);
};

export default Modal;
