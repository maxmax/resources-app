import { Router } from 'express';
import * as usersController from '../controllers/users.controller';

const router = Router();

router.post('/signup', usersController.createUser);
router.get('/', usersController.getUsers);
router.get('/:id/drafts', usersController.getUserDrafts);
router.get('/:id', usersController.getUserById);

export default router;
