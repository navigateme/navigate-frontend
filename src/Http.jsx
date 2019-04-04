import axios from 'axios';

// let token = document.head.querySelector('meta[name="csrf-token"]');
// axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;

axios.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			console.log('Error 401');
			// store.dispatch(actions.authLogout());
		}

		return Promise.reject(error);
	}
);
export default axios;
