import Logo from './Logo';
import ThemeToggler from './ThemeToggler';

const Navbar = () => {
	const username = 'bobby';

	return (
		<header className="navbar">
			<Logo />

			<div className="page-navigation">
				<a className="page-navigation__link" href="/dashboard">
					Dashboard
				</a>
				<a className="page-navigation__link" href="/add">
					Add
				</a>
				<a className="page-navigation__link" href="/settings">
					Settings
				</a>
			</div>

			<ThemeToggler />

			<div className="user-info">
				<div className="user-info__img">{username.slice(0, 1)}</div>
				<span className="user-info__username">{username}</span>
			</div>

			<button className="btn--without-border">Log Out</button>
		</header>
	);
};

export default Navbar;
