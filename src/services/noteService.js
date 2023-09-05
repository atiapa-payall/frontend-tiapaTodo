import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/v1';
let token = '';
const setToken = (newToken)=> {
	token = `Bearer ${newToken}`;
};
const getAll = async () => {
	const request = await axios.get(`${baseUrl}/notes`);
	return request.data;
};

const create = async (newObject) => {
	const config = {
		headers: {
			Authorization: token
		}
	};
	const request = axios.post(`${baseUrl}/notes`, newObject, config);
	return request.then(res => res.data);
};

const update = async (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then(res => res.data);
};

export default { getAll, create, update, setToken };