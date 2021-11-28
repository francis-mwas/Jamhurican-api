import database from '../src/models';

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
      throw error;
    }
  }
  /**
   *
   * @returns all users
   */
  static async getAllUsers() {
    try {
      return await database.user.findAll();
    } catch (error) {
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
        where: { userId: Number(userId) },
      });
      return user;
    } catch (error) {
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
        where: { userId: Number(userId) },
      });

      if (userToUpdate) {
        await database.user.update(userData, {
          where: { userId: Number(userId) },
        });
        return updateUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {*} id
   * @returns deletedUser
   */
  static async deleteUser(userId) {
    try {
      const userToDelete = await database.user.findOne({
        where: { userId: Number(userid) },
      });
      if (userToDelete) {
        const deletedUser = await database.destroy({
          where: { userId: Number(userId) },
        });
        return deletedUser;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
