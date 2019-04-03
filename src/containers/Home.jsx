import React from 'react';
// import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core/es';

import { withRouter } from 'react-router-dom';
import { useCss } from 'react-use';

import Topbar from './Home/Topbar';
import RegistrationForm from './Home/RegistrationForm';
import BackgroundImage from '../images/sgnup_images/CuX5XX2.png';
import { unstable_Box as Box } from '@material-ui/core/Box/Box';

const propTypes = {};

const defaultProps = {};

function Home(props) {
	const bg = useCss({
		backgroundImage: `url(${BackgroundImage})`,
		backgroundPosition: 'center 43%',
		height: '40vh'
	});

	const footLinks = useCss({
		margin: '0px 10px',
		textDecoration: 'none',
		color: '#999999',
		fontSize: '10pt'
	});

	return (
		<Box style={{ background: '#f2f2f2' }}>
			<Box className={bg}>
				<Topbar />
			</Box>

			<Box style={{ minHeight: '60vh' }}>
				<Grid container justify="center">
					<Grid px="5px" item>
						<Box pt="20px">
							<RegistrationForm />
						</Box>
					</Grid>
				</Grid>

				<Box p="20px">
					<Grid container={true} spacing={16} justify="space-around">
						<Grid item={true}>
							<a className={footLinks} href="/about">
								About
							</a>
							<a className={footLinks} href="/post-ad">
								Post Ad
							</a>
							<a className={footLinks} href="/apply">
								Apply
							</a>
							<a className={footLinks} href="/careers">
								Careers
							</a>
							<a className={footLinks} href="/privacy">
								Privacy
							</a>
							<a className={footLinks} href="/help">
								Help
							</a>
						</Grid>
						<Grid item={true}>
							<a className={footLinks} href="/help">
								2019 English (US)
							</a>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
}

export default withRouter(Home);

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
