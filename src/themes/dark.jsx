import { deepOrange, yellow } from '@material-ui/core/es/colors';

export let dark = {
	palette: {
		type: 'dark',

		background: {
			default: '#272E33'

			// default: '#1D212D',
			// paper: '#2A2E3A'
		},
		primary: yellow,
		secondary: {
			light: deepOrange[300],
			main: deepOrange[500],
			dark: deepOrange[700]
		}
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		useNextVariants: true
	},
	muiTheme: {
		appBar: {
			height: 10
		}
	}
};
