import { User } from './User';
import { Persistable, PersistableData } from './IPersistable';
const crypto = require("crypto");

interface RefreshTokenPersistableData extends PersistableData {
    userId: string;
    token: string;
    expires: Date;
    created: Date;
    createdByIp: string;
    revoked: Date;
    revokedByIp: string;
    replacedByToken: string;
}

export class RefreshToken implements Persistable<RefreshTokenPersistableData>  {
    private _userId: string;
    private _token: string;
    private _expires: Date;
    private _created: Date;
    private _createdByIp: string;
    private _revoked: Date;
    private _revokedByIp: string;
    private _replacedByToken: string;

    get userId() {
        return this._userId
    }

    set userId(val: string) {
        this._userId = val
    }

    get token() {
        return this._token
    }

    set token(val: string) {
        this._token = val
    }

    get expires() {
        return this._expires
    }

    set expires(val: Date) {
        this._expires = val
    }

    get created() {
        return this._created
    }

    set created(val: Date) {
        this._created = val
    }

    get createdByIp() {
        return this._createdByIp
    }

    set createdByIp(val: string) {
        this._createdByIp = val
    }

    get revoked() {
        return this._revoked
    }

    set revoked(val: Date) {
        this._revoked = val
    }

    get revokedByIp() {
        return this._revokedByIp
    }

    set revokedByIp(val: string) {
        this._revokedByIp = val
    }

    get replacedByToken() {
        return this._replacedByToken
    }

    set replacedByToken(val: string) {
        this._replacedByToken = val
    }

    constructor(props: Omit<RefreshToken, 'revoked' |'revokedByIp' |'replacedByToken' | 'token' | 'getData'>, token?: string) {
        Object.assign(this, props);
        if (!token) {
            this._token = crypto.randomBytes(40).toString('hex');
        }

    }
    public getData(): RefreshTokenPersistableData {
        return {
            userId: this.userId,
            token: this.token,
            expires: this.expires,
            created: this.created,
            createdByIp: this.createdByIp,
            revoked: this.revoked,
            revokedByIp: this.revokedByIp,
            replacedByToken: this.replacedByToken
        }
    }
}