import React, { createContext, useState } from 'react';

export const userContext = createContext();

export default ({ children }) => {
	const [state, setState] = useState({});

	return <userContext.Provider value={[state, setState]}>{children}</userContext.Provider>;
};
