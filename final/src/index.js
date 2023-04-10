import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/appContext';
import { UserProvider } from './context/userContext';
import { TransactionProvider } from './context/transactionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AppProvider>
			<UserProvider>
				<TransactionProvider>
					<App />
				</TransactionProvider>
			</UserProvider>
		</AppProvider>
	</React.StrictMode>
);
