import { ReadUserUseCase } from './ReadUserUseCase';

export class ReadUserController {
    constructor(
        private readUserUseCase: ReadUserUseCase,
    ) { }
    async handle(req,res): Promise<Response> {
        const { id } = req.params;
        try {
            const user = await this.readUserUseCase.execute({ id });
            return res.status(200).json({status:"success",user});
        } catch (err) {
            return res.status(400).json({
                message: err.message || "Erro inesperado."
            });
        }
    }
}