import { IRefreshTokenDTO } from './RefreshTokenDTO';

export class RefreshTokenUseCase {
    constructor(
        private auth
    ) { }
    async execute(data: IRefreshTokenDTO) {
        const {refreshToken, ipAddress} = data
        const result = await this.auth.refreshToken({ token:refreshToken, ipAddress })   
        
        return result     
    }
}