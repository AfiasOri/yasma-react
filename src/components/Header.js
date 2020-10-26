import React, { useState, useContext } from 'react';
import { Container, Menu, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { userContext } from '../context/userContext';

export default () => {
	const [active, setActive] = useState('home');
	const user = useContext(userContext)[0];

	const handleItemMenuClicked = (e, { name }) => setActive(name);

	const Item = ({ position, icon, name, children }) => (
		<Menu.Item
			position={position}
			icon={icon}
			name={name}
			active={active === name}
			as={Link}
			to={`/${name === 'home' ? '' : name}`}
			onClick={handleItemMenuClicked}>
			{children}
		</Menu.Item>
	);

	const renderAuthButtons = () => {
		return user.idToken ? (
			<>
				<Item name={user.userData.credentials.userName} icon='user' position='right' />
				<Item name='logout' icon='sign-out' />
			</>
		) : (
			<>
				<Item name='login' icon='sign-in' position='right' />
				<Item name='signup' icon='signup' />
			</>
		);
	};

	return (
		<Menu inverted color='teal' pointing secondary borderless fixed='top' size='massive'>
			<Container fluid>
				<Item>
					<Input icon='search' placeholder='Search...' size='small' />
				</Item>
				<Item name='home' icon='home' position='right' />
				<Item name='posts' icon='archive' />
				<Item name='users' icon='users' />
				{renderAuthButtons()};
			</Container>
		</Menu>
	);
};
