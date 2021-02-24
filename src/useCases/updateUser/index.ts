import { UpdateUserController } from './UpdateUserController';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { MongoDbUsersRepository } from '../../repositories/implements/MongoDbUsersRepository';

const usersRepository = new MongoDbUsersRepository()

const updateUserUseCase = new UpdateUserUseCase(
    usersRepository
)

const updateUserController = new UpdateUserController(
    updateUserUseCase
)
export{updateUserController,updateUserUseCase}