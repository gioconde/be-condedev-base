import { User } from '../../entities/User';
import { IUsersRepository } from "../../repositories/IUserRepository";
import { ISearchUserRequestDTO } from './SearchUserDTO';

export class SearchUserUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) { }
    async execute(data: ISearchUserRequestDTO) {
        const users:User[] = await this.usersRepository.search(data);
        return users;
    }
}