import { Animal } from './animal';

export class Cavalo extends Animal {

    constructor(nome: string) {
        // Construtores de classes derivadas devem conter uma chamada para o Super (Contrutor da classe Mãe)
        super(nome);
    }

    public mover(distanciaEmMetros: number): void {
        console.log('Galopando...');
        super.mover(distanciaEmMetros);
    }
}