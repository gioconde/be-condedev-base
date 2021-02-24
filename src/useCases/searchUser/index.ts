import { SearchUserController } from './SearchUserController';
import { SearchUserUseCase } from './SearchUserUseCase';
import { MongoDbUsersRepository } from '../../repositories/implements/MongoDbUsersRepository';

const usersRepository = new MongoDbUsersRepository()

const searchUserUseCase = new SearchUserUseCase(
    usersRepository
)

const searchUserController = new SearchUserController(
    searchUserUseCase
)
export{searchUserController,searchUserUseCase}