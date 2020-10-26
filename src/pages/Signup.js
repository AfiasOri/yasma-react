import React, { useContext, useState } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

import { userContext } from '../context/userContext';
import api, { login } from '../utils/api';

const initialState = { userName: '', email: '', password: '', confirmPassword: '', loading: false, errors: {} };

export default withRouter(({ history }) => {
	const [state, setState] = useState(initialState);
	const setUser = useContext(userContext)[1];

	const handleFieldChange = e => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const generalErrors = (
		<Message negative hidden={!state.errors.general}>
			<p>{state.errors.general}</p>
		</Message>
	);

	const handleSubmit = async () => {
		setState({ ...state, loading: true, errors: {} });

		try {
			await api.post('/signup', {
				email: state.email,
				userName: state.userName,
				password: state.password,
				confirmPassword: state.confirmPassword,
			});
			setState({ ...state, loading: false, errors: {} });

			const user = await login(state.email, state.password);
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
					Sign Up A New Account
				</Header>
				<Form autoComplete='off' size='massive'>
					<Segment stacked>
						<Form.Input
							fluid
							name='userName'
							icon='lock'
							iconPosition='left'
							placeholder='User Name'
							type='text'
							value={state.userName}
							onChange={handleFieldChange}
							error={
								state.errors.userName ? { content: state.errors.userName, pointing: 'above' } : false
							}
						/>
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
						<Form.Input
							fluid
							name='confirmPassword'
							icon='lock'
							iconPosition='left'
							placeholder='confirm Password'
							type='password'
							value={state.confirmPassword}
							onChange={handleFieldChange}
							error={
								state.errors.confirmPassword
									? { content: state.errors.confirmPassword, pointing: 'above' }
									: false
							}
						/>
						<Button loading={state.loading} color='teal' fluid size='large' onClick={handleSubmit}>
							Sign Up
						</Button>

						{generalErrors}
					</Segment>
				</Form>
				<Message>
					Already Have An Account? <Link to='/login'>Sign In Here</Link>
				</Message>
			</Grid.Column>
		</Grid>
	);
});
