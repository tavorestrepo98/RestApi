import { getUser, getUsers, postUser, putUser, deleteUser } from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', postUser);
router.put('/', putUser);
router.delete('/:id', deleteUser);

export default router;