import validator from 'validator';
import isEmpty from './isEmpty';
import { validateEmail } from '../helpers/helper';

export default (data) => {
  let errors = {};

  const firstName = !isEmpty(data.firstName) ? data.firstName : '';
  let lastName = !isEmpty(data.lastName) ? data.lastName : '';
  const email = !isEmpty(data.email) ? data.email : '';
  const password = !isEmpty(data.password) ? data.password : '';

  const validEmail = validateEmail(email);

  if (!validator.isLength(firstName, { min: 2, max: 50 })) {
    errors.firstName = 'first name must be between 2 and 30 characters';
  }
  if (validator.isEmpty(firstName)) {
    errors.fullName = 'first name field is required';
  }

  if (!validatedPhone.test(phoneNumber)) {
    errors.phoneNumber = 'Ivalid Phone Number';
  }

  if (validator.isEmpty(phoneNumber)) {
    errors.phoneNumber = 'Phone Number field is required';
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }
  if (!validator.isLength(password, { min: 6, max: 50 })) {
    errors.password = 'Password length must be a minimum of 6 characters';
  }

  if (!validEmail) {
    errors.email = 'Please enter a valid email address';
  }

  if (validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
