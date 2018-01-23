"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dao_1 = require("./dao");
var animal_1 = require("../aula07-classes/animal");
var cavalo_1 = require("../aula07-classes/cavalo");
var dao = new dao_1.Dao();
var animal = new animal_1.Animal('Rex');
var cavalo = new cavalo_1.Cavalo('Titan');
dao.insert(cavalo);
//# sourceMappingURL=run.js.map