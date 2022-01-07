import express from 'express';
import UserController from '../controllers/UserController';
import UserMiddleware from '../utils/middlewares/user';
import IsAuth from '../utils/middlewares/authentication';
import accessControl from '../utils/middlewares/accessControl';

const router = express.Router();

router.post(
  '/login',
  UserMiddleware.validateUserLogin,
  UserController.userLogin
);
router.post(
  '/',
  IsAuth,
  accessControl.restrictAccessTo('admin'),
  UserMiddleware.validateUserLogin,
  UserController.createNewUser
);
router.get(
  '/',
  IsAuth,
  accessControl.restrictAccessTo('admin'),
  UserController.getUsers
);
router.get(
  '/:userId',
  IsAuth,
  accessControl.restrictAccessTo('admin'),
  UserController.getUser
);
router.patch(
  '/:userId',
  IsAuth,
  accessControl.restrictAccessTo('admin'),
  UserController.updatedUser
);
router.delete(
  '/:userId',
  IsAuth,
  accessControl.restrictAccessTo('admin'),
  UserController.deleteUser
);

export default router;
