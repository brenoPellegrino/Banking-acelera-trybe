import { Response, Request, Router } from "express";
import UsersController from "../controllers/UsersController";
import { authentication, validateCreateUserRequest, validateLoginRequest } from "../middlewares"

const router = Router();
const userController = new UsersController();

// router.get('/',
// (req: Request, res: Response) => userController.findAll(req, res));

router.post('/', 
validateCreateUserRequest, 
(req: Request, res: Response) => userController.createUser(req, res));

router.post('/login',
validateLoginRequest,
(req: Request, res: Response) => userController.login(req, res));

router.patch('/',
authentication, 
(req: Request, res: Response) => userController.editUser(req, res));

router.delete('/',
authentication,
(req: Request, res: Response) => userController.deleteUser(req, res));

export default router;