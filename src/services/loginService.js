import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/v1/login';

const login = async (username, password) => {
	const body = {
		username,
		password
	};
	const {data} = await axios.post(baseUrl, body);
	return data;
};

export default {login};