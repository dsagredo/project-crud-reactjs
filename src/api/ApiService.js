import axios from 'axios';

const srvUsers = async () => {
    const resp = await axios.get('https://jsonplaceholder.typicode.com/posts');
	return resp.data;
}

const srvDelete = async (id) => {
    const resp = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
	return resp;
}

const srvAdd = async (body) => {
    const resp = await axios.post('https://jsonplaceholder.typicode.com/posts', body);
	return resp;
}

const srvUpdate = async (id, body) => {
    const resp = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, body);
	return resp;
}


export { srvUsers, srvDelete, srvAdd, srvUpdate };