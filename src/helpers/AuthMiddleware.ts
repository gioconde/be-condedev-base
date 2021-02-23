import { promisify } from 'util'
const jwt = require('jsonwebtoken');

export const authMiddleware = async (req, res, next): Promise<Response> => {
    if (!req.headers.authorization) return res.status(401).json({ message: "Necessita token de acesso!" });
    const token = req.headers.authorization.replace('Bearer ', '');
    try {
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET)
        req.userId = decoded.userId
        next()
    } catch (err) {
        switch (err.name) {
            case "TokenExpiredError":
                return res.status(440).send("Token expirou!")
            default:
                return res.status(498).send("Token inválido!")
        }
    }
}