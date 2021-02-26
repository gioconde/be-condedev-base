import { SearchUserUseCase } from './SearchUserUseCase';

export class SearchUserController {
    constructor(
        private searchUserUseCase: SearchUserUseCase,
    ) { }
    async handle(req,res): Promise<Response> {
        const data = req.query;
        try {
            const users = await this.searchUserUseCase.execute(data);
            return res.status(200).json({status:"success",users});
        } catch (err) {
            return res.status(400).json({
                message: err.message || "Erro inesperado."
            });
        }
    }
}