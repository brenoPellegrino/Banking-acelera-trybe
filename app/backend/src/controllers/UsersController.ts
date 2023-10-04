import { Response, Request } from "express";
import UsersService from "../services/UsersService";
import { tokenValidation } from '../auth';
import mapStatusHTTP from "../helpers/mapStatusHTTP";

export default class UsersController {
    private userService = new UsersService ();

    async findAll(req: Request, res: Response): Promise<Response>{
        const drinks = await this.userService.findAll();

        if(drinks.status !== 'successful') return res.status(mapStatusHTTP(drinks.status)).json(drinks.data);

        return res.status(200).json(drinks);
    }

    async createUser(req: Request, res: Response): Promise<Response>{
        const response = await this.userService.createUser(req.body);

        if(response.status !== 'successful') return res.status(mapStatusHTTP(response.status)).json(response.data);

        return res.status(201).json({ token: response.data });
    }

    async login(req: Request, res: Response): Promise<Response>{
        const response = await this.userService.login(req.body);

        if(response.status !== 'successful') return res.status(mapStatusHTTP(response.status)).json(response.data);
        
        return res.status(200).json({ token: response.data });
    }

    async editUser(req: Request, res: Response): Promise<Response>{
        const { authentication } = req.headers;
        const decoded = tokenValidation(authentication as string);

        const { id, accType, accStatus } = decoded;

        if(accStatus === 'inactive') return res.status(401).json({ message: 'Unauthorized' });

        if (accType === 'admin') {
            const user = await this.userService.editUser(Number(id), req.body);

            if(user.status !== 'successful') return res.status(mapStatusHTTP(user.status)).json(user.data);

            return res.status(200).json(user);
        }

        const user = await this.userService.editUser(Number(id), req.body);

        if(user.status !== 'successful') return res.status(mapStatusHTTP(user.status)).json(user.data);

        return res.status(200).json(user);
    }

    async deleteUser(req: Request, res: Response): Promise<Response>{
        const { authentication } = req.headers;
        const decoded = tokenValidation(authentication as string);

        const { id, accType, accStatus } = decoded;

        if(accStatus === 'inactive') return res.status(401).json({ message: 'Unauthorized' });

        if (accType === 'admin') {
            const user = await this.userService.deleteUser(Number(id));

            if(user.status !== 'successful') return res.status(mapStatusHTTP(user.status)).json(user.data);

            return res.status(200).json(user);
        }


        const user = await this.userService.deleteUser(Number(id));

        if(user.status !== 'successful') return res.status(mapStatusHTTP(user.status)).json(user.data);
        
        return res.status(200).json(user);

    }
}