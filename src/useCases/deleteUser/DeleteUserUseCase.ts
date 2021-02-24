import { IUsersRepository } from "../../repositories/IUserRepository";
import { IDeleteUserRequestDTO } from './DeleteUserDTO';

export class DeleteUserUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) { }
    async execute(data: IDeleteUserRequestDTO) {
        return await this.usersRepository.delete(data.id);
    }
}