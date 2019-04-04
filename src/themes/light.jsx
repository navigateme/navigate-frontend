import { blue } from '@material-ui/core/colors';

export const light = {
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
		fontFamily: ['"Lato"', 'sans-serif'].join(','),
		useNextVariants: true
	},
	overrides: {
		MuiButton: {
			label: {
				textTransform: 'none'
			}
		}
	}
};
