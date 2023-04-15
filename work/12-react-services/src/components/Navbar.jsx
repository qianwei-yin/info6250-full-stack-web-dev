import Logo from './Logo';
import { ERROR_MESSAGES } from '../errorConstant';
import { fetchLogout } from '../services';

const Navbar = ({ states, setStates }) => {
	const { username } = states;

	function handleLogout() {
		fetchLogout()
			.then(() => {
				setStates((oldStates) => {
					return {
						...oldStates,
						loggedIn: false,
						username: '',
						storedWord: '',
						warningParams: {
							showWarning: false,
							warningMsg: '',
						},
					};
				});
			})
			.catch((err) => {
				setStates((oldStates) => {
					return {
						...oldStates,
						warningParams: {
							showWarning: true,
							warningMsg: ERROR_MESSAGES[err.error] || ERROR_MESSAGES.default,
						},
					};
				});
			});
	}

	return (
		<div className="header">
			<Logo />

			<div className="user">
				<span className="user__img">{username.slice(0, 1)}</span>
				<span className="user__name">{username}</span>

				<button className="btn btn--logout" onClick={handleLogout}>
					log out
				</button>
			</div>
		</div>
	);
};
export default Navbar;
