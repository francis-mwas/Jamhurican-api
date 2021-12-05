import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Util from '../utils/Utils';
import { authenticate } from '../utils/helpers/authenticationHelper';
import UserService from '../services/UserService';
import logger from '../config/logger.config';

const util = new Util();

class UserController {
  static async createNewUser(req, res) {
    const { firstName, lastName, email, password, isAdmin } = req.body;

    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === ''
    ) {
      util.setError(400, 'Please fill all the fields');
      return util.send(res);
    }

    try {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          logger.debug('Unable to generate salt');
          throw err;
        }
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            logger.warn(
              `There was an error when trying to hash user password: `,
              err
            );
            return res.status(500).json({
              status: false,
              message: 'Something went wrong. Please try that again.',
            });
          } else {
            const newUser = {
              firstName,
              lastName,
              email,
              password: hash,
              isAdmin,
            };
            const createdUser = await UserService.createUser(newUser);
            const user = {
              firstName: createdUser.firstName,
              lastName: createdUser.lastName,
              email: createdUser.email,
              isAdmin: createdUser.isAdmin,
              createdAt: createdUser.createdAt,
              updatedAt: createdUser.updatedAt,
            };
            util.setSuccess(201, 'User created successfully', user);
            return util.send(res);
          }
        });
      });
    } catch (error) {
      util.setError(400, error.message);
      logger.error(`Error occurred when creating user ${error}`);
      return util.send(res);
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      if (users.length > 0) {
        util.setSuccess(200, 'Users returned successfully', users);
        logger.debug(`Users returned successfully.`);
      } else {
        util.setError(404, 'No properties found at the moment');
        logger.warn(`No users found.`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      logger.error(`Error encountered while getting users ${error}`);
      return util.send(res);
    }
  }

  static async getUser(req, res) {
    const { userId } = req.params;
    if (!Number(userId)) {
      util.setError(
        400,
        'Invalid property id, please input valid numeric number'
      );
      logger.error(`Invalid user id ${userId}`);
      return util.send(res);
    }

    try {
      const user = await UserService.getOneUser(userId);

      console.log('The property found:', user);

      if (!user) {
        util.setError(
          404,
          `Invalid property id, please input valid numeric number ${id}`
        );
        logger.error(`Invalid user id ${userId}`);
      } else {
        util.setSuccess(200, 'Property returned successfully', user);
        logger.debug(`User details found ${user}`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      logger.error(`Error getting user ${error}`);
      return util.send(res);
    }
  }

  static async updatedUser(req, res) {
    const updatedUser = req.body;
    const { userId } = req.params;
    if (!Number(userId)) {
      util.setError(
        400,
        'Invalid property id, please input valid numeric number'
      );
      logger.error(`Invalid user id ${userId}`);
      return util.send(res);
    }
    try {
      const updateUser = await UserService.updateUser(userId, updatedUser);
      // construct user object to return so as to avoid return password in original user object
      const user = {
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        createdAt: updateUser.createdAt,
        updatedAt: updateUser.updatedAt,
      };
      if (!updateUser) {
        util.setError(404, `User with this id does not exist: ${userId}`);
        logger.error(`Invalid user id ${userId}`);
        return util.send(res);
      } else {
        util.setSuccess(200, 'User updated successfully', user);
        logger.debug(`User details updated ${updateUser}`);
        return util.send(res);
      }
    } catch (error) {
      util.setError(404, error);
      logger.error(`Error when updating user details ${error}`);
      return util.send(res);
    }
  }
  static async deleteUser(req, res) {
    const { userId } = req.params;

    if (!Number(userId)) {
      util.setError(400, 'Invalid user id, please input valid numeric number');
      logger.error(`Invalid urers id ${userId}`);
      return util.send(res);
    }

    try {
      const user = await UserService.deleteUser(userId);
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      if (user) {
        util.setSuccess(200, 'User deleted');
        logger.debug(`User details deleted ${userData}`);
      } else {
        util.setError(404, `User with this id ${userId} does not exist`);
        logger.warn(`Invalid user id ${userId}`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      logger.error(`Error when deleting user details ${error}`);
      return util.send(res);
    }
  }

  // user logoin
  static async userLogin(req, res) {
    logger.info('Incoming request for user login');
    const { email, password } = req.body;

    if (email === '' || password === '') {
      res.setError(400, 'Please provide email and password');
      return util.send(res);
    }
    const getUserDetails = await UserService.getUserByEmail(email);
    logger.debug(`User details are here: ${getUserDetails}`);
    if (!getUserDetails) {
      logger.error('No user found with this email', email);
      util.setError(404, `User with this email does not exist: ${email}`);
      return util.send(res);
    }
    const authenticated = await authenticate(password, getUserDetails);
    if (!authenticated) {
      logger.debug(`Incorrect user credentials provided ${password}`);
      util.setError(400, 'email or password not correct');
      return util.send(res);
    } else {
      // construct user payload
      const payload = {
        id: getUserDetails.id,
        email: getUserDetails.email,
        firstName: getUserDetails.firstName,
        lastName: getUserDetails.lastName,
        isAdmin: getUserDetails.isAdmin,
      };
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            logger.warn(
              `An error occurred when signing the JWT for the user: `,
              err
            );
            res.setError(400, 'Error when signing the JWT for the user');
            return util.send(res);
          }
          const tokenData = `Bearer ${token}`;
          util.setSuccess(200, 'successfully logged in', tokenData);
          logger.info(`User successfully logged in.`);
          return util.send(res);
        }
      );
    }
  }
}

export default UserController;
