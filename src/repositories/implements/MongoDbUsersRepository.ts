import { User } from '../../entities/User';
import { IUsersRepository } from './../IUserRepository';
import MongoDbSingleton from './MongoDbSingleton';

export class MongoDbUsersRepository implements IUsersRepository{
    async findByEmail(email:string):Promise<User>{
        const database = await MongoDbSingleton.getInstance()
        const collection = database.collection("users");
        const query = { email };
        const user:User = await collection.findOne(query);
        return user;
    }
    async save(user:User):Promise<void>{
        const database = await MongoDbSingleton.getInstance()
        const collection = database.collection("users");
        await collection.insertOne(user.getData());
    }
}