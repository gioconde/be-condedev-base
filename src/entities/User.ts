import { Persistable, PersistableData } from './IPersistable';
import { v4 } from "uuid";

interface UserPersistableData extends PersistableData {
    id: string
    name: string;
    email: string;
    password: string;
}

export class User implements Persistable<UserPersistableData>  {
    private readonly _id: string;
    private _name: string;
    private _email: string;
    private _password: string;

    constructor(props: Omit<User, 'id'|'getData'>, id?: string) {
        Object.assign(this, props);
        if (!id) this._id = v4()
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    set name(val: string) {
        this._name = val
    }

    get email() {
        return this._email
    }

    set email(val: string) {
        this._email = val
    }

    get password() {
        return this._password
    }

    set password(val: string) {
        this._password = val
    }
    public getData(): UserPersistableData {
        return {
            id:this.id,
            name: this.name,
            email: this.email,
            password: this.password,
        }
    }
}