import { useAppContext } from '../context/appContext';
import { useUserContext } from '../context/userContext';
import { useTransactionContext } from '../context/transactionContext';
import { fetchLogout } from '../services/sessionServices';
import Logo from './Logo';
import ThemeToggler from './ThemeToggler';

const Navbar = () => {
	const { setPage, catchErrorDuringUserAction, setLoggedIn, closePrompt, resetAppState } = useAppContext();
	const { username, setUsername, resetUserState } = useUserContext();
	const { resetTransactionState } = useTransactionContext();

	function handleLogout() {
		closePrompt();

		fetchLogout()
			.then(() => {
				resetAppState();
				resetUserState();
				resetTransactionState();
			})
			.catch(catchErrorDuringUserAction);
	}

	return (
		<header className="navbar">
			<Logo />

			<div className="page-navigation">
				<button onClick={() => setPage('dashboard')} className="page-navigation__btn">
					Dashboard
				</button>
				<button onClick={() => setPage('add')} className="page-navigation__btn">
					Add
				</button>
				<button onClick={() => setPage('settings')} className="page-navigation__btn">
					Settings
				</button>
			</div>

			<ThemeToggler />

			<div className="user-info">
				<div className="user-info__img">{username.slice(0, 1)}</div>
				<span className="user-info__username">{username}</span>
			</div>

			<button className="btn--without-border" onClick={handleLogout}>
				Log Out
			</button>
		</header>
	);
};

export default Navbar;
