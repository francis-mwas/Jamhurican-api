import Util from '../utils/Utils';
import EncryptPassword from '../utils/EncryptPassword';
import UserService from '../services/UserService';
import logger from '../config/logger.config';

const util = new Util();

class UserController {
  static async createNewUser(req, res) {
    const encrypt = new EncryptPassword();

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
      const hashedPassword = encrypt.hashPassword(password);
      const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isAdmin,
      };
      if (hashedPassword) {
        const createdUser = await UserService.createUser(newUser);
        util.setSuccess(201, 'User created successfully', createdUser);
        return util.send(res);
      } else {
        util.setError(400, 'Error during password hashing');
        return util.send(res);
      }
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
        util.setSuccess(200, 'Users returned successfully', allProperties);
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
      if (!updateUser) {
        util.setError(404, `User with this id does not exist: ${userId}`);
        logger.error(`Invalid user id ${userId}`);
      } else {
        util.setSuccess(200, 'Property updated successfully', updateUser);
        logger.debug(`User details updated ${updateUser}`);
      }
      return util.send(res);
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

      if (user) {
        util.setSuccess(200, 'User deleted');
        logger.debug(`User details deleted ${user}`);
      } else {
        util.setError(404, `Property with this id ${userId} does not exist`);
        logger.warn(`Invalid user id ${userId}`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      logger.error(`Error when deleting user details ${error}`);
      return util.send(res);
    }
  }
}

export default UserController;
