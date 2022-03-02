import database from '../src/models/index';
import logger from '../config/logger.config';
import user from '../src/models/user';
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
      const contributions = await database.contributions.findAll();
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
        where: { userId: Number(userId) },
      });
      return contributions;
    } catch (error) {
      logger.error(
        `Error occurred in service when fetching individual user contributions ${error}`
      );
      throw error;
    }
  }

  /**
   *
   * @param {*} contributionId
   * @returns Contribution
   */

  static async getOneContribution(contributionId) {
    try {
      const contribution = database.contributions.findOne({
        where: { id: Number(contributionId) },
      });
      return contribution;
    } catch (error) {
      logger.error(
        `Error occurred in service when fetching single contribution ${error}`
      );
      throw error;
    }
  }
}

export default ContributionsService;
