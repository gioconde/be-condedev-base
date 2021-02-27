import { SignInUseCase } from './SignInUseCase';

export class SignInController {
    constructor(
        private signInUseCase: SignInUseCase,
    ) { }
    async handle(req,res): Promise<Response> {
        const { email,password } = req.body;
        const ipAddress = req.ip;
        try {
            const result = await this.signInUseCase.execute({email ,password,ipAddress});
            const cookieOptions = {
                httpOnly: true,
                expires: result.refreshToken.expires
            };
            res.cookie('refreshToken', result.refreshToken.token, cookieOptions);
            return res.status(200).json({status:"success",token:result.jwtToken});
        } catch (err) {
            return res.status(err.code).json({
                message: err.message || "Erro inesperado."
            });
        }
    }
}