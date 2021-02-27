import { AuthMiddleware } from './AuthMiddleware';
import { MongoDbRefreshTokenRepository } from '../repositories/implements/MongoDbRefreshTokenRepository';
import { MongoDbUsersRepository } from '../repositories/implements/MongoDbUsersRepository';
import { Auth } from './Auth';

const refreshTokenRepository = new MongoDbRefreshTokenRepository()
const usersRepository = new MongoDbUsersRepository()

const auth = new Auth(
    refreshTokenRepository,usersRepository
)
const authMiddleware = new AuthMiddleware(
    refreshTokenRepository,usersRepository
)

export { auth,authMiddleware };
