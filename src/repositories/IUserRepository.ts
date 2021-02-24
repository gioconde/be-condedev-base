import { User } from "../entities/User";

export interface IUsersRepository{
    findByEmail(email:string): Promise<User>;
    findById(id:string): Promise<User>;
    save(user:User): Promise<boolean>;
    update(user:User): Promise<number>;
    delete(id:string): Promise<number>;
    search(params:object): Promise<User[]>;
}