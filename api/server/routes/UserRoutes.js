import express from 'express';
import UserController from '../controllers/UserController';
import UserMiddleware from '../utils/middlewares/user';

const router = express.Router();

router.post('/', UserController.createNewUser);
router.post(
  '/login',
  UserMiddleware.validateUserLogin,
  UserController.userLogin
);
router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getUser);
router.patch('/:userId', UserController.updatedUser);
router.delete('/:userId', UserController.deleteUser);

export default router;
