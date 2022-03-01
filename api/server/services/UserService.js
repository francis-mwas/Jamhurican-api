import database from '../src/models/index';
import logger from '../config/logger.config';
import 

class UserService {
  /**
   * create a new user
   * @param {*} newUser
   * @returns new user
   */
  static async createUser(newUser) {
    try {
      return await database.user.create(newUser);
    } catch (error) {
      logger.error(`Error occurred in service when creating user ${error}`);
      throw error;
    }
  }
  /**
   *
   * @returns all users
   */
  static async getAllUsers() {
    try {
      return await database.user.findAll({
        attributes: { exclude: ['password', 'updatedAt'] },
      });
    } catch (error) {
      logger.error(`Error occurred in service when getting users ${error}`);
      throw error;
    }
  }
  /**
   *
   * @param {*} userId
   * @returns a single user
   */
  static async getOneUser(userId) {
    try {
      const user = await database.user.findOne({
        where: { id: Number(userId) },
        attributes: { exclude: ['password', 'updatedAt'] },
      });
      return user;
    } catch (error) {
      logger.error(
        `Error occurred in service when fetching user details ${error}`
      );
      throw error;
    }
  }
  /**
   *
   * @param {*} email
   * @returns returns user associated with this email
   */

  static async getUserByEmail(email) {
    try {
      const user = await database.user.findOne({
        where: { email: email },
      });
      return user;
    } catch (error) {
      logger.error(
        `Error occurred in service when fetching data to login user ${error}`
      );
      throw error;
    }
  }

  /**
   *
   * @param {*} userId
   * @param {*} updateUser
   * @returns new user details
   */
  static async updateUser(userId, userData) {
    try {
      const userToUpdate = await database.user.findOne({
        where: { id: Number(userId) },
      });

      if (userToUpdate) {
        await database.user.update(userData, {
          where: { id: Number(userId) },
        });
        return userToUpdate;
      }
      return null;
    } catch (error) {
      logger.error(
        `Error occurred in service when updating user details ${error}`
      );
      throw error;
    }
  }

  /**
   *
   * @param {*} userId
   * @returns deletedUser
   */
  static async deleteUser(userId) {
    try {
      const userToDelete = await database.user.findOne({
        where: { id: Number(userId) },
      });
      if (userToDelete) {
        const deletedUser = await database.user.destroy({
          where: { id: Number(userId) },
        });
        return deletedUser;
      }
    } catch (error) {
      logger.error(
        `Error occurred in service when deleting user details ${error}`
      );
      throw error;
    }
  }
}

export default UserService;
