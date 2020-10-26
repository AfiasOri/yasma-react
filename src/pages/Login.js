import React, { useState, useContext } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { userContext } from '../context/userContext';

import { login } from '../utils/api';

const initialState = { email: '', password: '', loading: false, errors: {} };

export default withRouter(({ history }) => {
	const [state, setState] = useState(initialState);
	const setUser = useContext(userContext)[1];

	const generalErrors = (
		<Message negative hidden={!state.errors.general}>
			<p>{state.errors.general}</p>
		</Message>
	);

	const handleFieldChange = e => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		setState({ ...state, loading: true, errors: {} });

		try {
			const user = await login(state.email, state.password);
			setState({ ...state, loading: false, errors: {} });
			setUser({ ...user });
			history.push('/');
		} catch (e) {
			setState({ ...state, errors: e.response.data, loading: false });
		}
	};

	return (
		<Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='teal' textAlign='center'>
					Log in to your account
				</Header>
				<Form autoComplete='off' size='massive'>
					<Segment stacked>
						<Form.Input
							fluid
							name='email'
							icon='user'
							iconPosition='left'
							placeholder='E-mail address'
							value={state.email}
							onChange={handleFieldChange}
							error={state.errors.email ? { content: state.errors.email, pointing: 'above' } : false}
						/>
						<Form.Input
							fluid
							name='password'
							icon='lock'
							iconPosition='left'
							placeholder='Password'
							type='password'
							value={state.password}
							onChange={handleFieldChange}
							error={
								state.errors.password ? { content: state.errors.password, pointing: 'above' } : false
							}
						/>
						<Button loading={state.loading} color='teal' fluid size='large' onClick={handleSubmit}>
							Login
						</Button>

						{generalErrors}
					</Segment>
				</Form>
				<Message>
					New Here? <Link to='/signup'>Create An Account</Link>
				</Message>
			</Grid.Column>
		</Grid>
	);
});
