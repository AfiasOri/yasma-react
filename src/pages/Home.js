import React, { useState, useEffect } from 'react';
import { CardGroup, Grid } from 'semantic-ui-react';

import api from '../utils/api';

import Loader from '../components/Loader';
import PostCard from '../components/PostCard';
import ProfileCard from '../components/ProfileCard';

export default () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const fetched = await api.get('/posts');
			setPosts(fetched.data);
		};

		fetchPosts();
	}, []);

	const renderPosts = posts.length ? (
		posts.map(post => <PostCard key={post.id} post={post} />)
	) : (
		<Loader>Loading Posts...</Loader>
	);

	return (
		<Grid columns='2'>
			<Grid.Row>
				<Grid.Column floated='left' width='10'>
					<CardGroup>{renderPosts}</CardGroup>
				</Grid.Column>
				<Grid.Column floated='right' width='5'>
					<ProfileCard />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};
