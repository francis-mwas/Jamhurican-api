import validator from 'validator';
import isEmpty from './isEmpty';
import { validateEmail } from '../helpers/helper';

export default (data) => {
  let errors = {};

  const businessEmail = !isEmpty(data.businessEmail) ? data.businessEmail : '';

  const validEmail = validateEmail(businessEmail);

  if (!validEmail) {
    errors.businessEmail = 'Please enter a valid  email address';
  }

  if (validator.isEmpty(businessEmail)) {
    errors.businessEmail = 'Email addres is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
