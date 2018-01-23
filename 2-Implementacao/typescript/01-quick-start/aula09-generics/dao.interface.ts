// <T> Torna a DaoInterface genérico
export interface DaoInterface<T> {

    tableName: string;

    insert(object: T): boolean;
    update(object: T): boolean;
    delete(id: number): T;
    find(id: number): T;
    findAll(): Array<T>;
}
