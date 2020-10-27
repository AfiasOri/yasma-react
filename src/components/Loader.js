import React from 'react';

import { Dimmer, Loader } from 'semantic-ui-react';

export default ({ children }) => (
	<Dimmer active inverted>
		<Loader inverted>{children}</Loader>
	</Dimmer>
);
