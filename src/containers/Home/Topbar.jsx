import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, IconButton, Toolbar, AppBar } from '@material-ui/core/es';
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
							<Grid item>
								<Box zIndex="modal" position="absolute" mt="-35px">
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
								</Box>
							</Grid>
							<Grid item>
								<Box width={600} px="10px">
									<LoginForm />
								</Box>
							</Grid>
							<Grid item>
								<IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
									<MenuIcon />
								</IconButton>
							</Grid>
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
