import Http from '../Http';

export function login(credentials) {
	return Http.post('/auth/login', credentials);
}

export function socialLogin(data) {
	return Http.post(`/auth/login/${data.social}/callback${data.params}`);
}

export function resetPassword(credentials) {
	return Http.post('/auth/forgot', credentials);
}

export function updatePassword(credentials) {
	return Http.post('/auth/reset', credentials);
}

export function register(credentials) {
	return Http.post('/auth/register', credentials);
}
