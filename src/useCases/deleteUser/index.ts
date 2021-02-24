import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUseCase } from './DeleteUserUseCase';
import { MongoDbUsersRepository } from '../../repositories/implements/MongoDbUsersRepository';

const usersRepository = new MongoDbUsersRepository()

const deleteUserUseCase = new DeleteUserUseCase(
    usersRepository
)

const deleteUserController = new DeleteUserController(
    deleteUserUseCase
)
export{deleteUserController,deleteUserUseCase}
