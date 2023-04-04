import Logo from './Logo';

const Navbar = ({ states, setStates }) => {
	const { username } = states;

	function handleLogout() {
		console.log('trying to logout');
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
