import { promisify } from 'util'
import { IRefreshTokenRepository } from '../repositories/IRefreshTokenRepository';
const jwt = require('jsonwebtoken');

export class AuthMiddleware {
    constructor(
        private refreshTokenRepository: IRefreshTokenRepository,
    ) { }
    async handle(req, res, next): Promise<Response> {
        if (!req.headers.authorization) return res.status(400).json({ message: "Necessita token de acesso!" });
        const token = req.headers.authorization.replace('Bearer ', '');
        try {
            const decoded = await promisify(jwt.verify)(token, process.env.SECRET)
            const { userId } = decoded
            req.user = {id:userId}
            const refreshTokens = await this.refreshTokenRepository.findById(userId);
            req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);
            
            next()
        } catch (err) {
            switch (err.name) {
                case "TokenExpiredError":
                    return res.status(440).json({ message: "Token expirou!" });
                default:
                    return res.status(498).json({ message: "Token inválido!" });
            }
        }
    }
}