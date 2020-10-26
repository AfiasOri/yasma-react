import axios from 'axios';

const localUrl = 'http://localhost:5000/yasma-95d06/europe-west1/api';

const api = axios.create({ baseURL: localUrl });

export const login = async (email, password) => {
	try {
		const token = await api.post('/login', { email, password });

		const tokenString = `Bearer ${token.data.token}`;
		localStorage.setItem('idToken', tokenString);

		api.defaults.headers['Authorization'] = tokenString;

		const user = await api.get('/user');
		return { ...user.data, idToken: tokenString };
	} catch (e) {
		throw e;
	}
};

export default api;
