import React from 'react';

import { Grid, FormControlLabel, Checkbox, Button, Input, Typography, withStyles } from '@material-ui/core/es';

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
		<Form>
			<Box width={600}>
				<Grid container spacing={0} justify="space-around">
					<Grid item md={5}>
						<Box px="5px">
							<Field
								name={`items.description`}
								component={CustomInputComponent}
								fullWidth={true}
								placeholder="Email or Phone"
								margin="normal"
							/>
						</Box>
					</Grid>
					<Grid item md={5}>
						<Box px="5px">
							<Field
								name={`items.quantity`}
								component={CustomInputComponent}
								fullWidth={true}
								margin="normal"
								placeholder="Password"
							/>
						</Box>
					</Grid>
					<Grid item md={2}>
						<Box px="5px">
							<Button
								fullWidth
								size="small"
								color="secondary"
								variant="contained"
								style={{ textTransform: 'none' }}
							>
								Sign in
							</Button>
						</Box>
					</Grid>
				</Grid>
				<Grid container spacing={0} justify="space-around" alignItems="center">
					<Grid item md={5}>
						<Box px="5px">
							<FormControlLabel
								label=<Typography style={{ color: 'white' }}>Keep me logged in</Typography>
								control={<CustomCheckbox />}
								checked={values.agree === true}
								onChange={e => setFieldValue('agree', e.target.checked)}
							/>
						</Box>
					</Grid>
					<Grid item md={5}>
						<Box px="5px">
							<Typography>
								<a href="/forgot-password" style={{ color: 'white', textDecoration: 'none' }}>
									Forgot your password?
								</a>
							</Typography>
						</Box>
					</Grid>
					<Grid item md={2} />
				</Grid>
			</Box>
		</Form>
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
