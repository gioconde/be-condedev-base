import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
    ) { }
    async handle(req,res): Promise<Response> {
        const { name, email, password } = req.body;
        try {
            const created = await this.createUserUseCase.execute({ name, email, password });
            return res.status(200).json({status:"success",created});
        } catch (err) {
            return res.status(400).json({
                message: err.message || "Erro inesperado."
            });
        }
    }
}