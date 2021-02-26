import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController {
    constructor(
        private updateUserUseCase: UpdateUserUseCase,
    ) { }
    async handle(req,res): Promise<Response> {
        const {id} = req.params
        const { name ,email,password } = req.body;
        try {
            const count = await this.updateUserUseCase.execute({ id, name ,email,password });
            return res.status(200).json({status:"success",count});
        } catch (err) {
            return res.status(400).json({
                message: err.message || "Erro inesperado."
            });
        }
    }
}