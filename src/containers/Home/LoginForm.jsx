import React from 'react';

import { Grid, FormControlLabel, Checkbox, Button, Input, Typography, withStyles, Hidden } from '@material-ui/core/es';

import { unstable_Box as Box } from '@material-ui/core/Box/Box';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// import { white } from '@material-ui/core/es/colors';

const SignupSchema = Yup.object().shape({});

const styles = {
	root: {
		color: '#FFFFFF',
		'&$checked': {
			color: 'white'
		}
	},
	checked: {}
};

const CustomInputComponent = ({ field, ...props }) => (
	<Input type="text" style={{ height: 30, background: 'white', padding: 10 }} {...field} {...props} margin="none" />
);

const CustomCheckbox = withStyles(styles)(({ classes, ...props }) => (
	<Checkbox color="primary" required classes={{ root: classes.root, checked: classes.checked }} {...props} />
));

class LoginForm extends React.Component {
	initialValue = {
		login: ''
	};

	state = {};

	form = (
		{ dirty, values, isValid, handleSubmit, isSubmitting, setFieldValue } //
	) => (
		<Box width="100%">
			<Form>
				<Grid container spacing={16} justify="space-around">
					<Grid item md={5} xs={12}>
						<Field
							name={`items.description`}
							component={CustomInputComponent}
							fullWidth={true}
							placeholder="Email or Phone"
							margin="normal"
						/>
					</Grid>
					<Grid item md={5} xs={12}>
						<Field
							name={`items.quantity`}
							component={CustomInputComponent}
							fullWidth={true}
							margin="normal"
							placeholder="Password"
						/>
					</Grid>
					<Grid item md={2} xs={6}>
						<Button fullWidth size="small" color="secondary" variant="contained">
							Sign in
						</Button>
					</Grid>
				</Grid>
				<Grid container spacing={8} justify="space-between" alignItems="center">
					<Grid item md={5} xs={6}>
						<FormControlLabel
							label=<Typography style={{ color: 'white' }}>Keep me logged in</Typography>
							control={<CustomCheckbox />}
							checked={values.agree === true}
							onChange={e => setFieldValue('agree', e.target.checked)}
						/>
					</Grid>
					<Grid item md={5} xs={6}>
						<Typography style={{ textAlign: 'right' }}>
							<a href="/forgot-password" style={{ color: 'white', textDecoration: 'none' }}>
								Forgot your password?
							</a>
						</Typography>
					</Grid>
				</Grid>
			</Form>
		</Box>
	);

	render() {
		return (
			<Formik
				initialValues={this.initialValue}
				validationSchema={SignupSchema}
				onSubmit={this.handleSubmit}
				children={this.form}
			/>
		);
	}

	handleSubmit = (values, { setSubmitting, resetForm }) => {
		console.log(values, this.props);

		setTimeout(() => {
			setSubmitting(false);
			resetForm();
			this.setState({ processed: true });
		}, 2000);
	};
}

export default LoginForm;
