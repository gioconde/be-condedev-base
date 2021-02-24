import { User } from '../../entities/User';
import { IUsersRepository } from './../IUserRepository';
import MongoDbSingleton from './MongoDbSingleton';

export class MongoDbUsersRepository implements IUsersRepository{
    async search(params):Promise<User[]>{
        const database = await MongoDbSingleton.getInstance()
        const collection = database.collection("users");
        const query =JSON.parse(JSON.stringify(params));
        const result= await collection.find(query);
        return result.toArray();
    }    
    async findByEmail(email:string):Promise<User>{
        const database = await MongoDbSingleton.getInstance()
        const collection = database.collection("users");
        const query = { email };
        const user:User = await collection.findOne(query);
        return user;
    }    
    async findById(id:string):Promise<User>{
        const database = await MongoDbSingleton.getInstance()
        const collection = database.collection("users");
        const query = { id };
        const user:User = await collection.findOne(query);
        return user;
    }
    async save(user:User):Promise<boolean>{
        const database = await MongoDbSingleton.getInstance()
        const collection = database.collection("users");
        const result = await collection.insertOne(user.getData());
        return result.insertedId ? true:false
    }
    async update(user:User):Promise<number>{
        const database = await MongoDbSingleton.getInstance()
        const collection = database.collection("users");
        const result = await collection.updateOne({id:user.id},{$set:user});
        return result.modifiedCount;
    }
    async delete(id:string):Promise<number>{
        const database = await MongoDbSingleton.getInstance()
        const collection = database.collection("users");
        const result = await collection.deleteOne({id});
        return result.deletedCount;
    }
}