import { User } from '../../entities/User';
import { IUsersRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from './CreateUserDTO';
export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) { }
    async execute(data: ICreateUserRequestDTO) {
        const userExists = await this.usersRepository.findByEmail(data.email);        
        if (userExists) throw new Error("Usuário já existe.")
        const user = new User(data);
        await this.usersRepository.save(user);
    }
}