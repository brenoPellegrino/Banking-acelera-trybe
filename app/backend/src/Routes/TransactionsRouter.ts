import { Response, Request, Router } from "express";
import TransactionsController from "../controllers/TransactionsController";
import { authentication, validatePayCashbackRequirement } from "../middlewares"

const router = Router();
const transactionController = new TransactionsController();

// router.get('/',
// (req: Request, res: Response) => transactionController.findAll(req, res));

router.post('/',
authentication,
validatePayCashbackRequirement,
(req: Request, res: Response) => transactionController.registerPayment(req, res));

router.patch('/:id',
authentication,
validatePayCashbackRequirement,
(req: Request, res: Response) => transactionController.registerCashback(req, res));

router.get('/',
authentication,
(req: Request, res: Response) => transactionController.findTransactionByAcc(req, res));

export default router;