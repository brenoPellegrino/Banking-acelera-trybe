import IUser from "../interfaces/IUser";
import SequelizeUser from "../database/models/SequelizeUsers";
import { compareSync, hash } from "bcryptjs";
import { tokenGenerator } from "../auth/index";


export default class UsersModel {
    private sequelizeUser = SequelizeUser;

    async findAll(): Promise<IUser[] | null> {
        const dbData = await this.sequelizeUser.findAll();
        if (!dbData) return null;
        return dbData as IUser[];
    }

    async createUser(user: IUser): Promise<string | null> {
        const dbEmail = await this.sequelizeUser.findOne({
            where: {
                email: user.email
            }
        });

        if (dbEmail) return null;

        const dbCpfCnpj = await this.sequelizeUser.findOne({
            where: {
                cpfCnpj: user.cpfCnpj
            }
        });

        if (dbCpfCnpj) return null;
        
        const { password } = user;
        const hashedPassword = await hash(password, 10);

        user.password = hashedPassword;
        user.accStatus = 'active';
        user.accType = 'user';

        const newUser = await this.sequelizeUser.create(user);
        
        const { id, email, accType, accStatus } = newUser;

        const token = tokenGenerator({ id, email, accType, accStatus });

        if(!token) return null;

        return token;
    }

    async login(user: IUser): Promise<string | null> {
        const { email, password } = user;

        const dbUser = await this.sequelizeUser.findOne({
            where: {
                email
            }
        });

        if (!dbUser) return null;

        if (dbUser.accStatus === 'inactive') return null;

        const isPasswordCorrect = await compareSync(password, dbUser.password);

        if (!isPasswordCorrect) return null;

        const { id, accType, accStatus } = dbUser.get();

        const token = tokenGenerator({ id, email, accType, accStatus });

        return token;
    }

    async editUser(id: number, user: IUser): Promise<IUser | null> {

        try {

            if (user.password) {
                const hashedPassword = await hash(user.password, 10);
                user.password = hashedPassword;
            }
    
            const { cpfCnpj, ...rest } = user;
            
            const userToEdit = {
                ...rest
            };
    
            await this.sequelizeUser.update(userToEdit, {
                where: {
                    id
                }
            });

            const editedUser = await this.sequelizeUser.findOne({
                where: {
                    id
                }
            });

            if(!editedUser) return null;
    
            const { password, ...editedUserWithoutPassword } = editedUser.dataValues as IUser;
            return editedUserWithoutPassword as IUser;
            
        } catch (error) {
            console.log(error);
            return null;
        }

    }

    async deleteUser(id: number): Promise<IUser | null> {

        try {
            
            await this.sequelizeUser.update({ accStatus: "inactive" }, {
                where: {
                    id
                }
            });
            
            const userToDelete = await this.sequelizeUser.findOne({
                where: {
                    id
                }
            });
    
            const { password, ...deletedUserWithoutPassword } = userToDelete?.dataValues as IUser;
            return deletedUserWithoutPassword as IUser;

        } catch (error) {
            console.log(error);
            return null;
        }

    }

}