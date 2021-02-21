import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { MongoDbUsersRepository } from './../../repositories/implements/MongoDbUsersRepository';

const usersRepository = new MongoDbUsersRepository()

const createUserUseCase = new CreateUserUseCase(
    usersRepository
)

const createUserController = new CreateUserController(
    createUserUseCase
)
export{createUserController,createUserUseCase}