import React, { useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import api from './utils/api';
import { userContext } from './context/userContext';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';

function App() {
	const setUser = useContext(userContext)[1];

	useEffect(() => {
		let token = '';

		const handleLogInOnStart = async () => {
			token = localStorage.getItem('idToken');

			if (token) {
				const decodedToken = jwtDecode(token);

				if (decodedToken.exp * 1000 < Date.now()) setUser({});
				else {
					api.defaults.headers['Authorization'] = token;
					const user = await api.get('/user');
					setUser({ ...user.data, idToken: token });
				}
			}
		};

		handleLogInOnStart();
	}, [setUser]);

	return (
		<Router>
			<Header />
			<Container style={{ height: '100vh', paddingTop: '7em' }}>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/login' exact component={Login} />
					<Route path='/logout' exact component={Logout} />
					<Route path='/signup' exact component={Signup} />
				</Switch>
			</Container>
		</Router>
	);
}

export default App;
