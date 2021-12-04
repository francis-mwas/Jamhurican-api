import User from '../../models/userModel';
import userValidator from '../validators/userValidator';
import { validPhone } from './generalValidators';
import validateUserLogin from '../validators/userLogin';

export default class UserValidator {
  // validate user inputs during registration
  static validUsertInputs(req, res, next) {
    const { errors, isValid } = userValidator(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    next();
  }

  // make sure email is unique
  static uniqueEmail(req, res, next) {
    let errors = {};
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          errors.email = `User with email ${req.body.email} already exists`;
          return res.status(400).json(errors);
        }
        next();
      })
      .catch(next);
  }
  // unique phone number
  static uniqueUserPhone(req, res, next) {
    let errors = {};
    const phoneNumber = validPhone(req.body.phoneNumber);
    User.findOne({ phoneNumber })
      .then((user) => {
        if (user) {
          errors.phoneNumber = `User with phone ${req.body.phoneNumber} already exists`;
          return res.status(400).json(errors);
        }
        next();
      })
      .catch(next);
  }

  static validateUserLogin(req, res, next) {
    const { errors, isValid } = validateUserLogin(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    next();
  }
}
