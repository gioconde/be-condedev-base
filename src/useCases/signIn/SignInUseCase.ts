import { RefreshToken } from './../../entities/RefreshToken';
import { User } from '../../entities/User';
import { IRefreshTokenRepository } from '../../repositories/IRefreshTokenRepository';
import { IUsersRepository } from "../../repositories/IUserRepository";
import { ISignInDTO } from './SignInDTO';

const jwt = require('jsonwebtoken')
const argon2 = require('argon2');

export class SignInUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private refreshTokenRepository: IRefreshTokenRepository,
        private auth
    ) { }
    async execute(data: ISignInDTO) {
        const {email,password,ipAddress} = data
        return await this.auth.authenticate({ email, password, ipAddress })        
    }
}