import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { CssBaseline } from '@material-ui/core/es';
import { ApolloProvider } from 'react-apollo';

import { client } from './AppolioClient';
import { light } from './themes/light';
import Routes from './routes';

class App extends Component {
	render() {
		return (
			<>
				<CssBaseline />

				<MuiThemeProvider theme={createMuiTheme(light)}>
					<ApolloProvider client={client}>
						<Routes />
					</ApolloProvider>
				</MuiThemeProvider>
			</>
		);
	}
}

export default App;
