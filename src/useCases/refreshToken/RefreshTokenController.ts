import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

export class RefreshTokenController {
    constructor(
        private refreshTokenUseCase: RefreshTokenUseCase
    ) { }
    async handle(req, res): Promise<Response> {
        const token = req.headers.cookie;
        if(!token)return res.status(400).json({message:"Falha ao ler refresh Token"});
        
        const refreshToken = token && token.replace('refreshToken=', '');
        const ipAddress = req.ip;
        const result =  await this.refreshTokenUseCase.execute({ refreshToken, ipAddress });         
       
        const cookieOptions = {
            httpOnly: true,
            expires: result.refreshToken.expires
        };
        res.cookie('refreshToken', result.refreshToken.token, cookieOptions);
        return res.status(200).json({status:"success",token:result.jwtToken});             
    }
}