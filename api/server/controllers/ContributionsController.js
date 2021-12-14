import Util from '../utils/Utils';
import logger from '../config/logger.config';
import ContributionsService from '../services/ContributionService';

const util = new Util();
class ContributionController {
  static async createUserContribution(req, res) {
    const { userId } = req.params.userId;

    const { dateDeposited, amountPaid, amount } = req.body;

    if (dateDeposited === '' || amountPaid === '' || amount === '') {
      util.setError(400, 'Please fill all the fields');
      return util.send(res);
    }

    try {
      const addedContribution = await ContributionsService.addContributions({
        userId,
        dateDeposited,
        amountPaid,
        amount,
      });
      util.setSuccess(201, 'User created successfully', addedContribution);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      logger.error(`Error occurred when adding user contributions ${error}`);
      return util.send(res);
    }
  }
}

export default ContributionController;
