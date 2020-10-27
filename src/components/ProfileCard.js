import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Image, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';
import { userContext } from '../context/userContext';
import api from '../utils/api';
import { timeAgo } from '../utils/timeAgo';

const MyLabel = props => {
	const { icon, content } = props;

	return (
		<Label color='teal' content={content} icon={icon} style={{ display: 'block', margin: '5px 0' }} {...props} />
	);
};

export default () => {
	const user = useContext(userContext)[0];
	const [activities, setActivities] = useState([]);

	const renderAbout = () => {
		const { bio, website, location } = user.userData.credentials;

		if (!bio && !website && !location) return 'Nothing To See Here :(';

		return (
			<>
				{bio && <MyLabel content={bio} icon='book' />}
				{location && <MyLabel icon='map marker' content={location} />}
				{website && <MyLabel icon='world' content={website} as='a' target='_blank' rel='noopener noreferrer' />}
			</>
		);
	};

	useEffect(() => {
		const generateKey = (postId, type, createdAt) => {
			return `${postId}${type.str}${createdAt ? createdAt : ''}`;
		};
		const renderActivities = type => {
			if (Object.keys(user).length) {
				if (user.userData.hasOwnProperty(type.str)) {
					user.userData[type.str].map(async activity => {
						const post = await api.get(`/posts/${activity.postId}`);
						const newActivity = (
							<MyLabel
								key={generateKey(activity.postId, type.str, activity.createdAt)}
								icon={type.icon}
								content={`"${post.data.body.substring(0, 23)}"... By ${post.data.userName}`}
							/>
						);
						setActivities(prev => [...prev, newActivity]);
					});
				}
			}
		};
		renderActivities({ str: 'likes', icon: 'fire' });
		renderActivities({ str: 'comments', icon: 'comment alternate' });
	}, [user]);

	if (Object.keys(user).length)
		return (
			<Card color='teal'>
				<Image src={user.userData.credentials.imageUrl} />
				<Card.Content textAlign='center'>
					<Card.Header>{user.userData.credentials.userName}</Card.Header>
					<Card.Meta>
						<span className='date'>Joined {timeAgo(user.userData.credentials.createdAt)}</span>
					</Card.Meta>
					<Card.Description>
						<h3>About {user.userData.credentials.userName}:</h3>
						{renderAbout()}
					</Card.Description>
				</Card.Content>
				<Card.Content textAlign='center'>
					<Card.Header>Your Recent Activity:</Card.Header>
					<Card.Description>
						{activities.length ? activities.slice(0, 5) : 'Nothing to see here'}
					</Card.Description>
				</Card.Content>
			</Card>
		);

	if (user.idToken) return <Loader>Loading Profile...</Loader>;

	return (
		<Card color='teal'>
			<Card.Content textAlign='center'>
				<Card.Header>Hey Stranger!</Card.Header>
				<Card.Description>
					<Button.Group fluid>
						<Button color='pink' as={Link} to='/signup'>
							Sign Up
						</Button>
						<Button.Or />
						<Button color='violet' as={Link} to='/login'>
							Login
						</Button>
					</Button.Group>
				</Card.Description>
			</Card.Content>
		</Card>
	);
};
