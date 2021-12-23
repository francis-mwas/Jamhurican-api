import Util from '../utils/Utils';
import logger from '../config/logger.config';
import ContributionsService from '../services/ContributionService';

const util = new Util();
class ContributionController {
  static async createUserContribution(req, res) {
    const { userId } = req.query;

    logger.info(`User id: ${userId}`);

    const { dateDeposited, amountPaid, amount } = req.body;

    if (!dateDeposited || !amountPaid || !amount) {
      util.setError(400, 'Please fill all the fields');
      return util.send(res);
    }

    try {
      const addedContribution = await ContributionsService.addContributions({
        amount,
        dateDeposited,
        amountPaid,
        userId,
      });
      util.setSuccess(
        201,
        'Contribution posted successully',
        addedContribution
      );
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      logger.error(`Error occurred when adding user contributions ${error}`);
      return util.send(res);
    }
  }

  static async getAllContributions(req, res) {
    logger.info('Incoming request to get all contributions');
    try {
      const contributions =
        await ContributionsService.getAllusersContributions();
      if (contributions.length > 0) {
        util.setSuccess(
          200,
          'All contributions returned successfully',
          contributions
        );
        logger.debug(`Contributions returned successfully.`);
      } else {
        util.setError(404, 'No contributions found at the moment');
        logger.debug(`No contributions found.`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      logger.error(`Error encountered while getting contributions ${error}`);
      return util.send(res);
    }
  }

  static async getUserContributions(req, res) {
    const { userId } = req.params;
    logger.info(
      `Incoming request to get individual user contributions, user id is: ${userId}`
    );
    if (!Number(userId)) {
      util.setError(400, 'Invalid user id, please input valid numeric number');
      logger.error(`Invalid user id ${userId}`);
      return util.send(res);
    }
    try {
      const userContributions =
        await ContributionsService.getIndividualUserContributions(userId);
      if (!userContributions.length) {
        util.setError(404, 'Invalid user id, No contributions found');
        logger.debug(
          `Invalid user id, no contribution found for this user ${userId}`
        );
        return util.send(res);
      } else {
        util.setSuccess(
          200,
          'User contributions returned successfully',
          userContributions
        );
        logger.info(`User contributions found: ${userContributions}`);
        return util.send(res);
      }
    } catch (error) {
      util.setError(400, error);
      logger.error(`Error getting user contributions ${error}`);
      return util.send(res);
    }
  }
  static async getSingleContribution(req, res) {
    const { contributionId } = req.params;
    logger.info(
      `Incoming request to get single contribution, contribution id supplied is: ${contributionId}`
    );
    if (!Number(contributionId)) {
      util.setError(400, 'Invalid contribution id supplied');
      logger.error(`Invalid contribution id provided, ${contributionId}`);
      return util.send(res);
    }
    try {
      const contribution = await ContributionsService.getOneContribution(
        contributionId
      );
      logger.info(`Contribution is here: ${JSON.stringify(contribution)}`);
      if (!contribution) {
        util.setError(404, 'No contribution found for this id');
        logger.error('No contribution found under the provided id');
      } else {
        util.setSuccess(
          200,
          'Contribution returned successfully',
          contribution
        );
        logger.info(`Contributions found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, 'An error occurred when getting a contribution');
      logger.error(
        `An error occurred when getting a single contribution: ${error}`
      );
      return util.send(res);
    }
  }
}

export default ContributionController;
