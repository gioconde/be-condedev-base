import { User } from '../../entities/User';
import { IUsersRepository } from "../../repositories/IUserRepository";
import { IUpdateUserRequestDTO } from './UpdateUserDTO';
const argon2 = require('argon2');

export class UpdateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) { }
    async execute(data: IUpdateUserRequestDTO) {
        const userExists = await this.usersRepository.findById(data.id);        
        if (!userExists) throw new Error("Usuário inválido")
        userExists.name = data.name
        return await this.usersRepository.update(userExists);
    }
}