import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import './App.css';
import Routes from './routes';
import { CssBaseline } from '@material-ui/core/es';

const theme = createMuiTheme({
	palette: {
		secondary: {
			main: blue[900]
		},
		primary: {
			main: blue[500]
		}
	},
	typography: {
		// Use the system font instead of the default Roboto font.
		fontFamily: ['"Lato"', 'sans-serif'].join(',')
	},
	overrides: {
		MuiButton: {
			label: {
				textTransform: 'none'
			}
		}
	}
});

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<CssBaseline />

				<MuiThemeProvider theme={theme}>
					<Routes />
				</MuiThemeProvider>
			</React.Fragment>
		);
	}
}

export default App;
