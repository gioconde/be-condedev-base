import { SearchUserUseCase } from './SearchUserUseCase';

export class SearchUserController {
    constructor(
        private searchUserUseCase: SearchUserUseCase,
    ) { }
    async handle(req,res): Promise<Response> {
        const { name ,email } = req.body;
        try {
            const users = await this.searchUserUseCase.execute({ name ,email });
            return res.status(200).json({status:"success",users});
        } catch (err) {
            return res.status(400).json({
                message: err.message || "Erro inesperado."
            });
        }
    }
}