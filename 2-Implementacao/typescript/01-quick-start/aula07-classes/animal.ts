/**
 * export: Usado para quando quiser usar a classe em outros lugares
 */
export class Animal {

    private nome: string;

    constructor(nome: string) {
        this.nome = nome;
    }

    public mover(distanciaEmMetros: number): void {
        // Quando usar o ` é possível usar expressões.
        console.log(`${this.nome} moveu ${distanciaEmMetros}m.`);
    }
}