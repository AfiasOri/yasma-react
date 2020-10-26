import React, { useState, useEffect } from 'react';
import { CardGroup, Grid } from 'semantic-ui-react';

import api from '../utils/api';

import PostCard from '../components/PostCard';

export default () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const fetched = await api.get('/posts');
			setPosts(fetched.data);
		};

		fetchPosts();
	}, []);

	const renderPosts = posts.map(post => <PostCard key={post.id} post={post} />);

	return (
		<Grid columns='2'>
			<Grid.Row>
				<Grid.Column floated='left' width='10'>
					<CardGroup>{renderPosts}</CardGroup>
				</Grid.Column>
				<Grid.Column
					floated='right'
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'blue',
						color: 'white',
					}}
					width='4'>
					Profile
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};
