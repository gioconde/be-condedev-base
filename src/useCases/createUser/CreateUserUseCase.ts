import { User } from '../../entities/User';
import { IUsersRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from './CreateUserDTO';
const argon2 = require('argon2');

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) { }
    async execute(data: ICreateUserRequestDTO) {
        const userExists = await this.usersRepository.findByEmail(data.email);        
        if (userExists) throw new Error("Usuário já existe.")
        const password = await argon2.hash(data.password);        
        const user = new User({...data,password});
        return await this.usersRepository.save(user);
    }
}