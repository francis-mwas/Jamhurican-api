import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.post('/', UserController.createNewUser);
router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getUser);
router.put('/:userId', UserController.updatedUser);
router.delete('/:userId', UserController.deleteUser);

export default router;
