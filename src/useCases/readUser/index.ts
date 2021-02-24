import { ReadUserController } from './ReadUserController';
import { ReadUserUseCase } from './ReadUserUseCase';
import { MongoDbUsersRepository } from './../../repositories/implements/MongoDbUsersRepository';

const usersRepository = new MongoDbUsersRepository()

const readUserUseCase = new ReadUserUseCase(
    usersRepository
)

const readUserController = new ReadUserController(
    readUserUseCase
)
export{readUserController,readUserUseCase}