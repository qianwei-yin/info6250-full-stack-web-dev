import { useAppContext } from '../context/context';
import { ReactComponent as IconSun } from '../icons/sun-solid.svg';
import { ReactComponent as IconMoon } from '../icons/moon-solid.svg';

const ThemeToggler = () => {
	const { toggleTheme } = useAppContext();

	return (
		<div className="theme-toggler">
			<input type="checkbox" className="theme__checkbox" id="checkbox" onChange={toggleTheme} />
			<label htmlFor="checkbox" className="theme__label">
				<IconMoon className="icon theme__label--moon" />
				<IconSun className="icon theme__label--sun" />
				<span className="theme__label--ball"></span>
			</label>
		</div>
	);
};

export default ThemeToggler;
