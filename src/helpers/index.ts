import { MongoDbRefreshTokenRepository } from '../repositories/implements/MongoDbRefreshTokenRepository';
import { AuthMiddleware } from './AuthMiddleware';

const refreshTokenRepository = new MongoDbRefreshTokenRepository()

const authMiddleware = new AuthMiddleware(
    refreshTokenRepository
)

export{authMiddleware}