import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, IconButton, Toolbar, AppBar, Hidden } from '@material-ui/core/es';
import { unstable_Box as Box } from '@material-ui/core/Box/Box';

import MenuIcon from '@material-ui/icons/Menu';

import LoginForm from './LoginForm';
// import GreyLogo from '../../images/logo-2.png';

const styles = theme => ({
	root: {
		width: '100%'
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	navbar: {
		minHeight: 80,
		padding: 20
	}
});

class PrimarySearchAppBar extends React.Component {
	state = {
		anchorEl: null,
		mobileMoreAnchorEl: null
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<AppBar position="fixed" className={classes.navbar}>
					<Toolbar>
						<Grid container alignContent="center" alignItems="center" justify="space-between">
							<Grid item md={3} sm={12}>
								{/* <img
										src={GreyLogo}
										alt={
											<Typography
												style={{ color: '#ffffff', fontSize: 40, fontWeight: 'bolder' }}
											>
												Navigate
											</Typography>
										}
									/> */}
								<Typography style={{ color: '#ffffff', fontSize: 40, fontWeight: 'bolder' }}>
									Navigate
								</Typography>
							</Grid>
							<Grid item md={6} sm={12}>
								<Box m="auto" style={{ maxWidth: '600px' }}>
									<LoginForm />
								</Box>
							</Grid>
							<Hidden smDown>
								<Grid item md={3} sm={12}>
									<Box textAlign="right">
										<IconButton color="inherit">
											<MenuIcon />
										</IconButton>
									</Box>
								</Grid>
							</Hidden>
						</Grid>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

PrimarySearchAppBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimarySearchAppBar);
