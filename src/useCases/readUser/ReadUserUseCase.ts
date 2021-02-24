import { User } from '../../entities/User';
import { IUsersRepository } from "../../repositories/IUserRepository";
import { IReadUserRequestDTO } from './ReadUserDTO';
const argon2 = require('argon2');

export class ReadUserUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) { }
    async execute(data: IReadUserRequestDTO) {
        const user:User = await this.usersRepository.findById(data.id);   
        return user;
    }
}