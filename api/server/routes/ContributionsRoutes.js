import express from 'express';
import { listenerCount } from 'pg/lib/query';
import ContributionController from '../controllers/ContributionsController';
import accessControl from '../utils/middlewares/accessControl';

const router = express.Router();

router.post(
  '/add',
  accessControl.restrictAccessTo('admin'),
  ContributionController.createUserContribution
);
router.get(
  '/',
  accessControl.restrictAccessTo('admin'),
  ContributionController.getAllContributions
);
router.get(
  '/:userId',
  accessControl.restrictAccessTo('admin'),
  ContributionController.getUserContributions
);
router.get(
  '/contribution/:contributionId',
  accessControl.restrictAccessTo('admin'),
  ContributionController.getSingleContribution
);

export default router;
