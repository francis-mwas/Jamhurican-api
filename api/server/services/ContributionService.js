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
}

export default ContributionsService;
