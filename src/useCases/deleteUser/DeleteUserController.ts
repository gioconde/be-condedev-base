import { DeleteUserUseCase } from './DeleteUserUseCase';

export class DeleteUserController {
    constructor(
        private deleteUserUseCase: DeleteUserUseCase,
    ) { }
    async handle(req,res): Promise<Response> {
        const { id} = req.body;
        try {
            const count = await this.deleteUserUseCase.execute({ id });
            return res.status(200).json({status:"success",count});
        } catch (err) {
            return res.status(400).json({
                message: err.message || "Erro inesperado."
            });
        }
    }
}