import React, { useContext } from 'react';
import { Redirect, withRouter } from 'react-router';
import { Modal, Header, Icon, Button, Segment } from 'semantic-ui-react';

import { userContext } from '../context/userContext';

import Home from '../pages/Home';

export default withRouter(({ history }) => {
	const [user, setUser] = useContext(userContext);

	const handleLogout = () => {
		localStorage.removeItem('idToken');
		setUser({});
		history.push('/');
	};

	const handleGoBack = () => {
		history.goBack();
	};

	if (Object.keys(user).length)
		return (
			<>
				<Home />
				<Modal dimmer='blurring' size='tiny' onClose={() => <Redirect to='/' />} open>
					<Header icon>
						<Icon name='sign-out' />
						<p>Hey {user.userData.credentials.userName},</p>
						<p>Are you sure you want to log out?</p>
					</Header>

					<Modal.Actions>
						<Segment textAlign='center' basic>
							<Button color='red' onClick={handleLogout} size='big' inverted>
								<Icon name='remove' /> Yes, Log me out
							</Button>
							<Button color='green' inverted onClick={handleGoBack} size='big'>
								<Icon name='checkmark' /> No, I wanna stay
							</Button>
						</Segment>
					</Modal.Actions>
				</Modal>
			</>
		);

	return null;
});
