import database from '../src/models/index';
import logger from '../config/logger.config';

class ContributionsService {
  /**
   *
   * @param {*} contribution
   * @returns newly added contribution
   */
  static async addContributions(contribution) {
    try {
      return await database.contributions.create(contribution);
    } catch (error) {
      logger.error(
        `Error occurred in service when adding contribution ${error}`
      );
      throw error;
    }
  }
  /**
   *
   * @returns all users contributions
   */

  static async getAllusersContributions() {
    try {
      const contributions = await database.contributions.findAll({
        include: User,
      });
      return contributions;
    } catch (error) {
      logger.error(
        `Error occurred in service when retrieving all contribution ${error}`
      );
      throw error;
    }
  }
  /**
   *
   * @param {*} userId
   * @returns all user contributions uniquely identified by user id
   */
  static async getIndividualUserContributions(userId) {
    try {
      const contributions = await database.contributions.findAll({
        where: { userId: userId },
      });
      return contributions;
    } catch (error) {
      logger.error(
        `Error occurred in service when fetching individual user contributions ${error}`
      );
      throw error;
    }
  }
}

export default ContributionsService;
