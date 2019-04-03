import React from 'react';
import { Grid, Button, TextField, FormHelperText, Typography, InputAdornment, IconButton } from '@material-ui/core/es';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCss, useBoolean } from 'react-use';

import { unstable_Box as Box } from '@material-ui/core/Box/Box';

import Select from 'react-select';
import MuiPhoneInput from 'material-ui-phone-number';

import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import AsyncButton from '../../components/AsyncButton';

const SignupSchema = Yup.object().shape({
	last_name: Yup.string().required('Last name is required'),

	first_name: Yup.string().required('First name is required'),

	phone: Yup.string().required('Phone number is required'),

	gender: Yup.string()
		.oneOf(['male', 'female'], 'Invalid gender')
		.required("What's your gender?."),

	email: Yup.string()
		.email('Enter a valid E-mail')
		.required('E-mail address is required.'),

	password: Yup.string()
		.min(6, 'Password has to be longer than 6 characters!')
		.required('Password is required!'),

	password_confirmation: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords are not the same!')
		.required('Password confirmation is required!'),

	dob: Yup.object().shape({
		day: Yup.string().required('Required'),
		year: Yup.string().required('Required'),
		month: Yup.string().required('Required')
	})
});

function CustomInputComponent({ field, ...props }) {
	const textField = useCss({
		background: '#FFFFFF',
		fontWeight: 'bolder'
	});

	return <TextField {...field} {...props} margin="dense" variant="outlined" fullWidth={true} className={textField} />;
}

function CustomPhoneComponent({ field, onChangeCountry, ...props }) {
	const inputClass = useCss({
		background: '#FFFFFF',
		fontWeight: 'bolder',
		margin: '7px 0 5px 0'
	});

	const phoneClass = useCss({
		width: '100%'
	});

	return (
		<MuiPhoneInput
			{...props}
			variant="outlined"
			inputClass={phoneClass}
			disableAreaCodes={true}
			onChange={onChangeCountry}
			inputProps={{ margin: 'dense', className: inputClass }}
		/>
	);
}

function listYears() {
	var currentYear = new Date().getFullYear(),
		years = [],
		startYear = currentYear - 100;
	while (startYear <= currentYear) {
		startYear++;
		years.push({ value: startYear, label: startYear });
	}

	return years;
}

function listDays() {
	var days = [];

	for (let index = 1; index < 32; index++) {
		days.push({ value: index, label: index });
	}

	return days;
}

function FormFields(props) {
	const [showPassword, setShowPassword] = useBoolean();

	const { dirty, isSubmitting, handleSubmit, setFieldValue, values } = props;

	return (
		<Form>
			<Box mx={'20px'} style={{ maxWidth: 600 }}>
				<Grid container={true} spacing={16}>
					<Grid xs={6} item={true}>
						<Field name="first_name" component={CustomInputComponent} placeholder="First Name" />
						<ErrorMessage name="first_name" component={FormHelperText} error={true} />
					</Grid>

					<Grid xs={6} item={true}>
						<Field name="last_name" component={CustomInputComponent} placeholder="Last Name" />
						<ErrorMessage name="last_name" component={FormHelperText} error={true} />
					</Grid>

					<Grid xs={12} item={true}>
						<Field name="email" component={CustomInputComponent} placeholder="Your Email" />
						<ErrorMessage name="email" component={FormHelperText} error={true} />
					</Grid>

					<Grid xs={12} item={true}>
						<CustomPhoneComponent
							value={values.phone}
							defaultCountry="gh"
							placeholder="Phone number"
							onChangeCountry={value => setFieldValue('phone', value)}
						/>
						<ErrorMessage name="phone" component={FormHelperText} error={true} />
					</Grid>

					<Grid xs={6} item={true}>
						<Field
							name="password"
							placeholder="Password"
							component={CustomInputComponent}
							type={showPassword ? 'text' : 'password'}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<IconButton
											aria-label="Toggle password visibility"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								)
							}}
						/>
						<ErrorMessage name="password" component={FormHelperText} error={true} />
					</Grid>

					<Grid xs={6} item={true}>
						<Field
							name="password_confirmation"
							placeholder="Confirm password"
							component={CustomInputComponent}
							type={showPassword ? 'text' : 'password'}
						/>
						<ErrorMessage name="password_confirmation" component={FormHelperText} error={true} />
					</Grid>

					<Grid xs={12} item={true}>
						<Typography style={{ fontSize: 20 }}>Your birthday</Typography>
					</Grid>
					<Grid xs={3} item={true}>
						<Field
							placeholder="Month"
							component={Select}
							menuPlacement="auto"
							options={[
								{ value: 'January', label: 'January' },
								{ value: 'February', label: 'February' },
								{ value: 'March', label: 'March' },
								{ value: 'April', label: 'April' },
								{ value: 'May', label: 'May' },
								{ value: 'June', label: 'June' },
								{ value: 'July', label: 'July' },
								{ value: 'August', label: 'August' },
								{ value: 'September', label: 'September' },
								{ value: 'October', label: 'October' },
								{ value: 'November', label: 'November' },
								{ value: 'December', label: 'December' }
							]}
							onChange={value => setFieldValue('dob.month', value.value)}
						/>
						<ErrorMessage name="dob.month" component={FormHelperText} error={true} />
					</Grid>
					<Grid xs={3} item={true}>
						<Field
							placeholder="Day"
							component={Select}
							menuPlacement="auto"
							options={listDays()}
							onChange={value => setFieldValue('dob.day', value.value)}
						/>
						<ErrorMessage name="dob.day" component={FormHelperText} error={true} />
					</Grid>
					<Grid xs={3} item={true}>
						<Field
							placeholder="Year"
							component={Select}
							menuPlacement="auto"
							options={listYears()}
							onChange={value => setFieldValue('dob.year', value.value)}
						/>
						<ErrorMessage name="dob.year" component={FormHelperText} error={true} />
					</Grid>
					<Grid xs={3} item={true}>
						<Field
							placeholder="Gender"
							component={Select}
							menuPlacement="auto"
							options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}
							onChange={value => setFieldValue('gender', value.value)}
						/>
						<ErrorMessage name="gender" component={FormHelperText} error={true} />
					</Grid>

					<Grid xs={12} item={true}>
						<Typography variant="caption">
							By clicking 'Sign up' you agree to our `Terms` and that you have read our `Data use ,
							including our `Cookie use`.
						</Typography>
					</Grid>

					<Grid xs={4} item={true}>
						<AsyncButton
							fullWidth
							dirty={dirty}
							color="primary"
							variant="contained"
							onClick={handleSubmit}
							disabled={isSubmitting}
							// processed={this.state.processed}
							processing={isSubmitting}
							done="Done"
						>
							Sign up
						</AsyncButton>
					</Grid>

					<Grid xs={4} item={true}>
						<Button variant="contained" color="secondary" fullWidth>
							<Box position="absolute" left="10%" component={FaFacebook} /> Facebook
						</Button>
					</Grid>

					<Grid xs={4} item={true}>
						<Button variant="contained" style={{ background: 'white' }} fullWidth>
							<Box position="absolute" left="10%" component={FaGoogle} />
							Google
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Form>
	);
}

class RegistrationForm extends React.Component {
	initialValue = {
		email: '',
		phone: '',
		gender: '',
		country: '',
		password: '',
		last_name: '',
		first_name: '',
		password_confirmation: '',

		dob: {
			day: '',
			year: '',
			month: ''
		}
	};

	render() {
		return (
			<Formik
				initialValues={this.initialValue}
				validationSchema={SignupSchema}
				onSubmit={this.handleSubmit}
				children={props => <FormFields {...props} />}
			/>
		);
	}

	handleSubmit = values => {
		console.log(values);
	};
}

export default RegistrationForm;
