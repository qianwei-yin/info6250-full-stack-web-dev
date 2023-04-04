import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggler = ({ setTheme }) => {
	function toggleTheme() {
		setTheme((theme) => {
			return theme === 'light-theme' ? 'dark-theme' : 'light-theme';
		});
	}

	return (
		<div className="theme-toggler">
			<input type="checkbox" className="theme__checkbox" id="checkbox" onChange={toggleTheme} />
			<label for="checkbox" className="theme__label">
				<FiMoon className="theme__label--moon" />
				<FiSun className="theme__label--sun" />
				<span className="theme__label--ball"></span>
			</label>
		</div>
	);
};

export default ThemeToggler;
