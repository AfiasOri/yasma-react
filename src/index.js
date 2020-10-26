import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';

import UserStore from './context/userContext';
import './globals.css';

ReactDOM.render(
	<UserStore>
		<App />
	</UserStore>,
	document.getElementById('root')
);
