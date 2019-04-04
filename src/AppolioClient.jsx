import ApolloClient from 'apollo-boost';

let csrf = document.head.querySelector('meta[name="csrf-token"]');

export const client = new ApolloClient({
	uri: `${process.env.REACT_APP_API_BASEURL}/graphql`,
	request: async operation => {
		const token = await localStorage.getItem('jwt_token');
		operation.setContext({
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
				'X-Requested-With': 'XMLHttpRequest',
				'X-CSRF-TOKEN': csrf.content
			}
		});
	},
	onError: ({ graphQLErrors, networkError }) => {
		console.log(graphQLErrors);
		// if (graphQLErrors) {
		// 	sendToLoggingService(graphQLErrors);
		// }
		if (networkError?.response?.status === 401) {
			// store.dispatch(actions.authLogout());
		}
	}
});

export const clientFunction = () => client;
