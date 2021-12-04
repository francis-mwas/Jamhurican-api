import validator from 'validator';
import isEmpty from './isEmpty';

export default (data) => {
  let errors = {};

  const email = !isEmpty(data.email) ? data.email : '';
  const password = !isEmpty(data.password) ? data.password : '';
  const role = !isEmpty(data.role) ? data.role : '';

  if (validator.isEmpty(email)) {
    errors.email = 'Email is required';
  }
  if (!validator.isEmail(email)) {
    errors.email = 'Please provide a valid email address';
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Password is required';
  }

  if (validator.isEmpty(role)) {
    errors.role = 'Role is required';
  }

  const roleChoices = ['admin', 'normal-user'];

  if (!roleChoices.includes(data.role)) {
    errors.role = 'Please provide a valid choice';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
