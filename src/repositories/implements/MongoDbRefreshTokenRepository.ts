import { RefreshToken } from '../../entities/RefreshToken';
import { IRefreshTokenRepository } from '../IRefreshTokenRepository';
import MongoDbSingleton from './MongoDbSingleton';

export class MongoDbRefreshTokenRepository implements IRefreshTokenRepository {
    async findByToken(token: string): Promise<RefreshToken> {
        const database = await MongoDbSingleton.getInstance()
        const collection = database.collection("refreshTokens");
        const query = { token };
        const refreshToken: RefreshToken = await collection.findOne(query);
        return refreshToken;
    }
    async findById(userId: string): Promise<RefreshToken[]> {
        const database = await MongoDbSingleton.getInstance()
        const collection = database.collection("refreshTokens");
        const query = { userId };
        const refreshToken = await collection.find(query);
        return refreshToken.toArray();
    }
    async save(refreshToken: RefreshToken): Promise<boolean> {
        const database = await MongoDbSingleton.getInstance()
        const collection = database.collection("refreshTokens");
        const result = await collection.insertOne(refreshToken.getData());
        return result.insertedId ? true : false
    }
    async update(refreshToken: RefreshToken): Promise<number> {
        const database = await MongoDbSingleton.getInstance()
        const collection = database.collection("refreshTokens");
        const result = await collection.updateOne({ token: refreshToken.token }, { $set: refreshToken });
        return result.modifiedCount;
    }
}