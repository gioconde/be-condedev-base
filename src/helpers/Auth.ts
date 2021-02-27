import { RefreshToken } from "../entities/RefreshToken";
import { User } from "../entities/User";
import { IRefreshTokenRepository } from "../repositories/IRefreshTokenRepository";
import { IUsersRepository } from "../repositories/IUserRepository";
const jwt = require('jsonwebtoken')
const argon2 = require('argon2');

export class Auth {
    constructor(
        private refreshTokenRepository: IRefreshTokenRepository,
        private usersRepository: IUsersRepository
    ) { }
    async authenticate({ email, password, ipAddress }) {
        const user: User = await this.usersRepository.findByEmail(email);
        if (!user || !await argon2.verify(user.password, password)) throw ({ message: "Credenciais inválidas", code: 401 })

        const jwtToken = this.generateJwtToken(user);
        const refreshToken = this.generateRefreshToken(user.id, ipAddress);

        await this.refreshTokenRepository.save(refreshToken);

        return {
            userId: user.id,
            jwtToken,
            refreshToken: refreshToken
        };
    }

    generateJwtToken(user) {
        return jwt.sign({ sub: user.id, id: user.id }, process.env.SECRET, {
            expiresIn: 60
        });
    }

    generateRefreshToken(userID, ipAddress) {
        return new RefreshToken({
            userId: userID,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),//24h
            created: new Date(Date.now()),
            createdByIp: ipAddress
        });
    }

    isActiveRefreshToken(refreshToken) {
        const date = new Date(refreshToken.expires)
        const isExpired = date < new Date(Date.now())

        return !refreshToken.revoked && !isExpired;
    }

    async refreshToken({ token, ipAddress }) {
        const refreshToken = await this.getRefreshToken(token);
        //if(!refreshToken)throw ({ message: "Token inválido", code: 401 })

        const { userId } = refreshToken;
        const newRefreshToken = this.generateRefreshToken(userId, ipAddress);
        refreshToken.revoked = new Date(Date.now());
        refreshToken.revokedByIp = ipAddress;
        refreshToken.replacedByToken = newRefreshToken.token;

        await this.refreshTokenRepository.update(refreshToken);
        await this.refreshTokenRepository.save(newRefreshToken);
        const jwtToken = this.generateJwtToken(userId);
        return {
            userId,
            jwtToken,
            refreshToken: newRefreshToken
        };
    }

    async revokeToken({ token, ipAddress }) {
        const refreshToken = await this.getRefreshToken(token);
        refreshToken.revoked = new Date(Date.now());
        refreshToken.revokedByIp = ipAddress;

        await this.refreshTokenRepository.update(refreshToken);
    }

    async getRefreshTokens(userId) {
        await this.getUser(userId);
        const refreshTokens = await this.refreshTokenRepository.findById(userId);
        return refreshTokens;
    }

    async getUser(id) {
        const user = await this.usersRepository.findById(id);
        if (!user) throw 'User not found';
        return user;
    }
    async getRefreshToken(token) {
        const refreshToken = await this.refreshTokenRepository.findByToken(token);
        if (!refreshToken || !this.isActiveRefreshToken(refreshToken)) throw ({ message: "Token inválido", code: 498 });
        return refreshToken;
    }
}