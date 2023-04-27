import { ReactComponent as LogoImg } from '../icons/logo.svg';

const Logo = () => {
	return (
		<div className="logo">
			<LogoImg className="logo__img" />
			<span className="logo__text">Expense</span>
		</div>
	);
};

export default Logo;
