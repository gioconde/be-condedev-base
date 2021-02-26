import { RefreshToken } from "../entities/RefreshToken";

export interface IRefreshTokenRepository{
    findByToken(token:string): Promise<RefreshToken>;    
    findById(id:string): Promise<RefreshToken[]>;    
    save(refreshToken:RefreshToken): Promise<boolean>;
}