import express from 'express';
import ContributionController from '../controllers/ContributionsController';
import accessControl from '../utils/middlewares/accessControl';

const router = express.Router();

router.post(
  '/add',
  accessControl.restrictAccessTo('admin'),
  ContributionController.createUserContribution
);

export default router;
