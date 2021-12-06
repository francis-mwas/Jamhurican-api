import express from 'express';
import UserController from '../controllers/UserController';
import UserMiddleware from '../utils/middlewares/user';
import IsAuth from '../utils/middlewares/authentication';

const router = express.Router();

router.post(
  '/login',
  UserMiddleware.validateUserLogin,
  UserController.userLogin
);
router.post('/', IsAuth, UserController.createNewUser);
router.get('/', IsAuth, UserController.getUsers);
router.get('/:userId', IsAuth, UserController.getUser);
router.patch('/:userId', IsAuth, UserController.updatedUser);
router.delete('/:userId', IsAuth, UserController.deleteUser);

export default router;
