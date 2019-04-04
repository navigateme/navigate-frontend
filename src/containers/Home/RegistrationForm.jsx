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

import { AuthService } from '../../services';
import AsyncButton from '../../components/AsyncButton';

const phoneRegex = /((?:\+|00)[17](?: |-)?|(?:\+|00)[1-9]\d{0,2}(?: |-)?|(?:\+|00)1-\d{3}(?: |-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |-)[0-9]{3}(?: |-)[0-9]{4})|([0-9]{7}))/;
const iso2alpha1 = /^(A(D|E|F|G|I|L|M|N|O|R|S|T|Q|U|W|X|Z)|B(A|B|D|E|F|G|H|I|J|L|M|N|O|R|S|T|V|W|Y|Z)|C(A|C|D|F|G|H|I|K|L|M|N|O|R|U|V|X|Y|Z)|D(E|J|K|M|O|Z)|E(C|E|G|H|R|S|T)|F(I|J|K|M|O|R)|G(A|B|D|E|F|G|H|I|L|M|N|P|Q|R|S|T|U|W|Y)|H(K|M|N|R|T|U)|I(D|E|Q|L|M|N|O|R|S|T)|J(E|M|O|P)|K(E|G|H|I|M|N|P|R|W|Y|Z)|L(A|B|C|I|K|R|S|T|U|V|Y)|M(A|C|D|E|F|G|H|K|L|M|N|O|Q|P|R|S|T|U|V|W|X|Y|Z)|N(A|C|E|F|G|I|L|O|P|R|U|Z)|OM|P(A|E|F|G|H|K|L|M|N|R|S|T|W|Y)|QA|R(E|O|S|U|W)|S(A|B|C|D|E|G|H|I|J|K|L|M|N|O|R|T|V|Y|Z)|T(C|D|F|G|H|J|K|L|M|N|O|R|T|V|W|Z)|U(A|G|M|S|Y|Z)|V(A|C|E|G|I|N|U)|W(F|S)|Y(E|T)|Z(A|M|W))$/;

const SignupSchema = Yup.object().shape({
	last_name: Yup.string().required('Last name is required'),

	first_name: Yup.string().required('First name is required'),

	phone: Yup.string()
		.matches(phoneRegex, 'Invalid phone number')
		.required('Phone number is required'),

	country: Yup.string()
		.matches(iso2alpha1, 'Invalid country code')
		.required('Invalid phone number'),

	gender: Yup.string()
		.oneOf(['male', 'female'], 'Invalid gender')
		.required("What's your gender?"),

	email: Yup.string()
		.email('Enter a valid E-mail')
		.required('E-mail address is required.'),

	password: Yup.string()
		.min(6, 'Password has to be longer than 6 characters!')
		.required('Password is required!'),

	password_confirmation: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords are not the same!')
		.required('Password confirmation is required!'),

	d: Yup.object().shape({
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

function CustomPhoneComponent({ field, onChangePhone, ...props }) {
	const inputClass = useCss({
		background: '#FFFFFF',
		fontWeight: 'bolder',
		margin: '7px 0 5px 0'
	});

	const phoneClass = useCss({ width: '100%' });

	return (
		<MuiPhoneInput
			{...props}
			variant="outlined"
			inputClass={phoneClass}
			disableAreaCodes={true}
			onChange={onChangePhone}
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
						<ErrorMessage name="first_name" component={FormHelperText} error />
					</Grid>

					<Grid xs={6} item={true}>
						<Field name="last_name" component={CustomInputComponent} placeholder="Last Name" />
						<ErrorMessage name="last_name" component={FormHelperText} error />
					</Grid>

					<Grid xs={12} item={true}>
						<Field name="email" component={CustomInputComponent} placeholder="Your Email" />
						<ErrorMessage name="email" component={FormHelperText} error />
					</Grid>

					<Grid xs={12} item={true}>
						<CustomPhoneComponent
							value={values.phone}
							defaultCountry="gh"
							placeholder="Phone number"
							onChangePhone={(phone, country) => {
								setFieldValue('phone', phone);
								setFieldValue('country', country?.countryCode.toUpperCase());
							}}
						/>
						{values.country ? (
							<ErrorMessage name="phone" component={FormHelperText} error />
						) : (
							<ErrorMessage name="country" component={FormHelperText} error />
						)}
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
						<ErrorMessage name="password" component={FormHelperText} error />
					</Grid>

					<Grid xs={6} item={true}>
						<Field
							name="password_confirmation"
							placeholder="Confirm password"
							component={CustomInputComponent}
							type={showPassword ? 'text' : 'password'}
						/>
						<ErrorMessage name="password_confirmation" component={FormHelperText} error />
					</Grid>

					<Grid xs={12} item={true}>
						<Typography style={{ fontSize: 20 }}>Your birthday</Typography>

						<ErrorMessage name="dob" component={FormHelperText} error />
					</Grid>
					<Grid xs={3} item={true}>
						<Field
							placeholder="Month"
							component={Select}
							menuPlacement="auto"
							options={[
								{ value: 1, label: 'January' },
								{ value: 2, label: 'February' },
								{ value: 2, label: 'March' },
								{ value: 4, label: 'April' },
								{ value: 5, label: 'May' },
								{ value: 6, label: 'June' },
								{ value: 7, label: 'July' },
								{ value: 8, label: 'August' },
								{ value: 9, label: 'September' },
								{ value: 10, label: 'October' },
								{ value: 11, label: 'November' },
								{ value: 12, label: 'December' }
							]}
							onChange={value => setFieldValue('d.month', value.value)}
						/>
						<ErrorMessage name="d.month" component={FormHelperText} error />
					</Grid>
					<Grid xs={3} item={true}>
						<Field
							placeholder="Day"
							component={Select}
							menuPlacement="auto"
							options={listDays()}
							onChange={value => setFieldValue('d.day', value.value)}
						/>
						<ErrorMessage name="d.day" component={FormHelperText} error />
					</Grid>
					<Grid xs={3} item={true}>
						<Field
							placeholder="Year"
							component={Select}
							menuPlacement="auto"
							options={listYears()}
							onChange={value => setFieldValue('d.year', value.value)}
						/>
						<ErrorMessage name="d.year" component={FormHelperText} error />
					</Grid>
					<Grid xs={3} item={true}>
						<Field
							placeholder="Gender"
							component={Select}
							menuPlacement="auto"
							options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}
							onChange={value => setFieldValue('gender', value.value)}
						/>
						<ErrorMessage name="gender" component={FormHelperText} error />
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
							processing={isSubmitting}
							done="Done"
						>
							Sign up
						</AsyncButton>
					</Grid>

					<Grid xs={4} item={true}>
						<Button
							fullWidth
							component="a"
							color="secondary"
							variant="contained"
							href={`${process.env.REACT_APP_BASEURL}/login-with/facebook`}
						>
							<Box position="absolute" left="10%" component={FaFacebook} /> Facebook
						</Button>
					</Grid>

					<Grid xs={4} item={true}>
						<Button
							fullWidth
							component="a"
							variant="contained"
							style={{ background: 'white' }}
							href={`${process.env.REACT_APP_BASEURL}/login-with/google`}
						>
							<Box position="absolute" left="10%" component={FaGoogle} />
							Google
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Form>
	);
}

const initialValue = {
	dob: '',
	email: '',
	phone: '',
	gender: '',
	country: '',
	password: '',
	last_name: '',
	first_name: '',
	verify_phone: true,
	password_confirmation: '',
	d: { day: '', year: '', month: '' }
};

const handleSuccess = response => {};

function RegistrationForm() {
	return (
		<Formik
			initialValues={initialValue}
			validationSchema={SignupSchema}
			onSubmit={handleSubmit}
			children={props => <FormFields {...props} />}
		/>
	);

	function handleSubmit(values, { setSubmitting, setErrors, setFieldValue }) {
		let data = { ...values, dob: `${values.d.day}/${values.d.month}/${values.d.year}` };

		return AuthService.register(data)
			.then(handleSuccess)
			.catch(error => error.response?.status === 422 && setErrors(error.response.data.error.fields))
			.then(response => setSubmitting(false));
	}
}

export default RegistrationForm;
