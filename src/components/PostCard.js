import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Button, Grid, Icon } from 'semantic-ui-react';

import { timeAgo } from '../utils/timeAgo';

const ActionButtons = ({ onLikePressed, onCommentPressed }) => (
	<Grid centered columns='3' stretched>
		<Grid.Column>
			<Button color='teal' onClick={onLikePressed}>
				Like
			</Button>
		</Grid.Column>
		<Grid.Column>
			<Button color='teal' onClick={onCommentPressed}>
				Comment
			</Button>
		</Grid.Column>
		<Grid.Column>
			<Button color='teal' disabled>
				Share
			</Button>
		</Grid.Column>
	</Grid>
);

const ActionCounters = ({ likeCount, commentCount }) => (
	<Card.Meta>
		{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}, {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
	</Card.Meta>
);

export default ({ post: { userImage, userName, updatedAt, createdAt, body, likeCount, commentCount } }) => {
	return (
		<Card fluid>
			<Card.Content>
				<Link to={`/users/${userName}`}>
					<Image floated='right' avatar size='massive' src={userImage} />
				</Link>
				<Card.Header as={Link} to={`/users/${userName}`}>
					{userName}
				</Card.Header>
				<Card.Meta>{updatedAt ? timeAgo(updatedAt) : timeAgo(createdAt)}</Card.Meta>
				<Card.Description>{body}</Card.Description>
				<Card.Meta textAlign='center'>
					<Icon name='angle down' />
				</Card.Meta>
			</Card.Content>
			<Card.Content extra>
				<ActionCounters likeCount={likeCount} commentCount={commentCount} />
			</Card.Content>
			<Card.Content extra>
				<ActionButtons />
			</Card.Content>
		</Card>
	);
};
