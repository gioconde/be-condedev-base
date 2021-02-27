import { MongoDbUsersRepository } from '../../repositories/implements/MongoDbUsersRepository';
import { MongoDbRefreshTokenRepository } from '../../repositories/implements/MongoDbRefreshTokenRepository';
import { Auth } from '../../helpers/Auth';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';
import { RefreshTokenController } from './RefreshTokenController';

const usersRepository = new MongoDbUsersRepository()
const refreshTokenRepository = new MongoDbRefreshTokenRepository()
const auth = new Auth(
    refreshTokenRepository,usersRepository
)

const refreshToken = new RefreshTokenUseCase(
    auth,
)

const refreshTokenController = new RefreshTokenController(
    refreshToken
)
export{refreshTokenController,refreshToken}