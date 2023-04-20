import AddPage from '../../pages/AddPage';
import DashboardPage from '../../pages/DashboardPage';
import ErrorPage from '../../pages/ErrorPage';
import SettingsPage from '../../pages/SettingsPage';

const pageLinks = {
	dashboard: <DashboardPage />,
	add: <AddPage />,
	settings: <SettingsPage />,
	default: <ErrorPage />,
};

export default pageLinks;
