import React from 'react';

import { Grid, FormControlLabel, Checkbox, Input, Typography, withStyles, FormHelperText } from '@material-ui/core/es';
import { unstable_Box as Box } from '@material-ui/core/Box/Box';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { AuthService } from '../../services';
import AsyncButton from '../../components/AsyncButton';

const SignupSchema = Yup.object().shape({
	login: Yup.string().required('Login is required.'),
	password: Yup.string().required('Please enter password.')
});

const styles = { root: { color: '#FFFFFF', '&$checked': { color: 'white' } }, checked: {} };

const CustomInputComponent = ({ field, ...props }) => (
	<Input
		type="text"
		style={{ height: 30, background: 'white', padding: 10 }}
		{...field}
		{...props}
		margin="none"
		fullWidth={true}
	/>
);

const CustomCheckbox = withStyles(styles)(({ classes, ...props }) => (
	<Checkbox color="primary" required classes={{ root: classes.root, checked: classes.checked }} {...props} />
));

function FormFields(props) {
	const { dirty, isSubmitting, handleSubmit, setFieldValue, values } = props;

	return (
		<Box width="100%">
			<Form>
				<Grid container spacing={16} justify="space-around">
					<Grid item md={5} xs={12}>
						<Field name="login" component={CustomInputComponent} placeholder="Email or Phone" />
						<ErrorMessage name="login" component={FormHelperText} />
					</Grid>
					<Grid item md={5} xs={12}>
						<Field
							name="password"
							type="password"
							component={CustomInputComponent}
							placeholder="Password"
						/>
						<ErrorMessage name="password" component={FormHelperText} />
					</Grid>
					<Grid item md={2} xs={6}>
						<AsyncButton
							fullWidth
							dirty={dirty}
							color="secondary"
							variant="contained"
							processing={isSubmitting}
							disabled={isSubmitting}
							onClick={handleSubmit}
							// processed={this.state.processed}
							type="submit"
							size="small"
							done="Done"
						>
							Sign in
						</AsyncButton>
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
					<Grid item sm={5} xs={6}>
						<Typography
							component="a"
							href="/forgot-password"
							style={{ color: 'white', textDecoration: 'none' }}
						>
							Forgot your password?
						</Typography>
					</Grid>
				</Grid>
			</Form>
		</Box>
	);
}

function LoginForm() {
	return (
		<Formik
			initialValues={{ login: '', password: '' }}
			validationSchema={SignupSchema}
			onSubmit={handleSubmit}
			children={props => <FormFields {...props} />}
		/>
	);
}

const handleLogin = response => {};

const handleSubmit = (values, { setSubmitting, setErrors }) =>
	AuthService.login(values)
		.then(handleLogin)
		.catch(error => error.response?.status === 422 && setErrors(error.response.data.error.fields))
		.then(response => setSubmitting(false));

export default LoginForm;
