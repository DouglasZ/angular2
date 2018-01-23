"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * export: Usado para quando quiser usar a classe em outros lugares
 */
var Animal = (function () {
    function Animal(nome) {
        this.nome = nome;
    }
    Animal.prototype.mover = function (distanciaEmMetros) {
        // Quando usar o ` é possível usar expressões.
        console.log(this.nome + " moveu " + distanciaEmMetros + "m.");
    };
    return Animal;
}());
exports.Animal = Animal;
//# sourceMappingURL=animal.js.map