import { SignInController } from './SignInController';
import { SignInUseCase } from './SignInUseCase';
import { MongoDbUsersRepository } from '../../repositories/implements/MongoDbUsersRepository';
import { MongoDbRefreshTokenRepository } from '../../repositories/implements/MongoDbRefreshTokenRepository';

const usersRepository = new MongoDbUsersRepository()
const refreshTokenRepository = new MongoDbRefreshTokenRepository()

const signInUseCase = new SignInUseCase(
    usersRepository,refreshTokenRepository
)

const signInController = new SignInController(
    signInUseCase
)
export{signInController,signInUseCase}