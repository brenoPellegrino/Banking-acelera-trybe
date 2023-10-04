import { Router } from 'express';
import usersRouter from './UsersRouter';
import transactionsRouter from './TransactionsRouter';

const router = Router();

router.use('/users', usersRouter);
router.use('/transactions', transactionsRouter);


export default router;