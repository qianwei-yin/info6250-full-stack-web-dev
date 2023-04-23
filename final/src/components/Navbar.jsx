import { useAppContext } from '../context/appContext';
import { useUserContext } from '../context/userContext';
import { useTransactionContext } from '../context/transactionContext';
import { fetchLogout } from '../services/sessionServices';
import { Logo, ThemeToggler, Loading } from '../components';
import { SET_LOADING_LOGOUT } from '../scripts/actions/appActions';

const Navbar = () => {
	const { setPage, catchErrorDuringUserAction, closePrompt, resetAppState, setLoading, loadingLogout } =
		useAppContext();
	const { username, resetUserState } = useUserContext();
	const { resetTransactionState } = useTransactionContext();

	function handleLogout() {
		closePrompt();

		setLoading({ type: SET_LOADING_LOGOUT, value: true });
		fetchLogout()
			.then(() => {
				resetAppState();
				resetUserState();
				resetTransactionState();
			})
			.catch(catchErrorDuringUserAction)
			.finally(() => setLoading({ type: SET_LOADING_LOGOUT, value: false }));
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

			{loadingLogout ? (
				<Loading size="2" color="amber" />
			) : (
				<button className="btn--without-border" onClick={handleLogout}>
					Log Out
				</button>
			)}
		</header>
	);
};

export default Navbar;
