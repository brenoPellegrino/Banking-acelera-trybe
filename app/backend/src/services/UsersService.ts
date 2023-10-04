import { ServiceResponse } from "../interfaces/ServiceResponse";
import IUser from "../interfaces/IUser";
import UsersModel from "../models/UsersModel";

export default class UsersService {
    private userModel = new UsersModel();

    async findAll(): Promise<ServiceResponse<IUser[]>>{
        const users = await this.userModel.findAll();
        if (!users) return { status: 'notFound', data: { message: 'No users found'} };
        return { status: 'successful', data: users };
    }

    async createUser(user: IUser): Promise<ServiceResponse<string>>{
        const newUser = await this.userModel.createUser(user);
        if (!newUser) return { status: 'badRequest', data: { message: 'User not created. Email or CPF/CNPJ already registred'} };
        return { status: 'successful', data: newUser };
    }

    async login(user: IUser): Promise<ServiceResponse<string>>{
        const token = await this.userModel.login(user);
        if (!token) return { status: 'unauthorized', data: { message: 'Acc inactive or password invalid'} };
        return { status: 'successful', data: token };
    }

    async editUser(id: number, user: IUser): Promise<ServiceResponse<IUser>>{
        const editedUser = await this.userModel.editUser(id, user);
        
        if(!editedUser) return { status: 'badRequest', data: { message: 'User not edited'} };
        return { status: 'successful', data: editedUser };
    }

    async deleteUser(id: number): Promise<ServiceResponse<IUser>>{
        const deletedUser = await this.userModel.deleteUser(id);
        if(!deletedUser) return { status: 'badRequest', data: { message: 'User not deleted'} };
        return { status: 'successful', data: deletedUser };
    }
}