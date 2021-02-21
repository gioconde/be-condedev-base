export interface PersistableData {}

export interface Persistable<T extends PersistableData> {
    getData(): T;
}