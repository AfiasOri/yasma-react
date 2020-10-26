import axios from 'axios';

const localUrl = 'http://localhost:5000/yasma-95d06/europe-west1/api';

const api = axios.create({ baseURL: localUrl });

export default api;
