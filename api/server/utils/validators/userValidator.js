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
    errors.firstName = 'First name must be between 2 and 30 characters';
  }
  if (validator.isEmpty(firstName)) {
    errors.fullName = 'First name field is required';
  }

  if (!validator.isLength(lastName, { min: 2, max: 50 })) {
    errors.lastName = 'Last name must be between 2 and 30 characters';
  }

  if (validator.isEmpty(lastName)) {
    errors.lastName = 'Last name field is required';
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }
  if (!validator.isLength(password, { min: 6, max: 50 })) {
    errors.password = 'Password length must be between 6 and 50 characters';
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
