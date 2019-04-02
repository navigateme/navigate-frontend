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

const SignupSchema = Yup.object().shape({
	password: Yup.string()
		.min(6, 'Password has to be longer than 6 characters!')
		.required('Password is required!'),
	password_confirmation: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords are not the same!')
		.required('Password confirmation is required!'),
	country: Yup.string().required('Country is required'),
	address: Yup.string().required('Address is required'),
	last_name: Yup.string().required('Last name is required'),
	first_name: Yup.string().required('First name is required'),
	phone: Yup.string().required('Phone number name is required'),
	email: Yup.string()
		.email('Enter a valid E-mail')
		.required('Required')
	//
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
			style={{ width: '100%' }}
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

	const {
		// dirty, handleReset, handleSubmit,
		setFieldValue,
		values
	} = props;

	return (
		<Form style={{ width: 600 }}>
			<Grid container={true} spacing={16}>
				<Grid md={6} item={true}>
					<Field name="first_name" component={CustomInputComponent} placeholder="First Name" />
					<ErrorMessage name="first_name" component={FormHelperText} error={true} />
				</Grid>

				<Grid md={6} item={true}>
					<Field name="last_name" component={CustomInputComponent} placeholder="Last Name" />
					<ErrorMessage name="last_name" component={FormHelperText} error={true} />
				</Grid>
			</Grid>

			<Field name="email" component={CustomInputComponent} placeholder="Your Email" />
			<ErrorMessage name="email" component={FormHelperText} error={true} />

			<CustomPhoneComponent
				value={values.phone}
				defaultCountry="gh"
				placeholder="Phone number"
				onChangeCountry={value => setFieldValue('phone', value)}
			/>
			<ErrorMessage name="phone" component={FormHelperText} error={true} />

			<Grid container={true} spacing={16}>
				<Grid md={6} item={true}>
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

				<Grid md={6} item={true}>
					<Field
						name="password_confirmation"
						placeholder="Confirm password"
						component={CustomInputComponent}
						type={showPassword ? 'text' : 'password'}
					/>
					<ErrorMessage name="password_confirmation" component={FormHelperText} error={true} />
				</Grid>
			</Grid>

			<Grid container={true} spacing={16}>
				<Grid md={12} item={true}>
					<Typography style={{ fontSize: 20 }}>Your birthday</Typography>
				</Grid>
				<Grid md={3} item={true}>
					<Field
						placeholder="Month"
						name="month"
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
					/>
				</Grid>
				<Grid md={3} item={true}>
					<Field placeholder="Day" name="day" component={Select} menuPlacement="auto" options={listDays()} />
				</Grid>
				<Grid md={3} item={true}>
					<Field
						placeholder="Year"
						name="year"
						component={Select}
						menuPlacement="auto"
						options={listYears()}
					/>
				</Grid>
				<Grid md={3} item={true}>
					<Field
						placeholder="Gender"
						name="day"
						component={Select}
						menuPlacement="auto"
						options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}
					/>
				</Grid>
			</Grid>

			<br />
			<Typography variant="caption">
				By clicking 'Sign up' you agree to our `Terms` and that you have read our `Data use , including our
				`Cookie use`.
			</Typography>
			<br />

			<Grid container={true} spacing={16}>
				<Grid md={4} item={true}>
					<Button variant="contained" color="primary" fullWidth>
						Sign up
					</Button>
				</Grid>

				<Grid md={4} item={true}>
					<Button variant="contained" color="secondary" fullWidth>
						<Box position="absolute" left="10%" component={FaFacebook} /> Facebook
					</Button>
				</Grid>

				<Grid md={4} item={true}>
					<Button variant="contained" style={{ background: 'white' }} fullWidth prefix={<FaGoogle />}>
						<Box position="absolute" left="10%" component={FaGoogle} />
						Google
					</Button>
				</Grid>
			</Grid>
		</Form>
	);
}

class RegistrationForm extends React.Component {
	initialValue = {
		email: '',
		phone: '',
		country: '',
		last_name: '',
		first_name: '',
		password: '',
		password_confirmation: ''
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
