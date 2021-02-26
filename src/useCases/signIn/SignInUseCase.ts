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
    ) { }
    async execute(data: ISignInDTO) {
        const user: User = await this.usersRepository.findByEmail(data.email);
        if (!user) throw ({ message: "Credenciais inválidas", code: 401 })
        if (!await argon2.verify(user.password, data.password)) throw ({ message: "Credenciais inválidas", code: 401 })
        
        const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
            //expiresIn: '5m' 
        });

        const refreshToken: RefreshToken = new RefreshToken({
            userId: user.id,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),//24h
            created: new Date(Date.now()),
            createdByIp: data.ipAddress
        });
        await this.refreshTokenRepository.save(refreshToken);
        return {
            userId: user.id,
            token,
            refreshToken: refreshToken
        };
    }
}