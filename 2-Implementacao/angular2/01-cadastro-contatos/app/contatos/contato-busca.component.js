"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const Observable_1 = require("rxjs/Observable");
const Subject_1 = require("rxjs/Subject");
const contato_service_1 = require("./contato.service");
let ContatoBuscaComponent = class ContatoBuscaComponent {
    constructor(contatoService, router) {
        this.contatoService = contatoService;
        this.router = router;
        //Para que esse evento funcione é preciso sempre ter o Change no nome da variavel. Ex: Input: x Output xChange
        //Caso o Input tivesse o nome serach o Output ficaria "seachChange"
        this.buscaChange = new core_1.EventEmitter();
        //Subject: Produtor de fluxo de eventos observáveis, ou seja, teremos um outro Observable 
        //Toda vez que o usuário digitar uma busca no campo, vamos adicionar essa busca ao subject, pois ele gerencia esse fluxo de eventos. Ex:
        //É como se tivéssemos dando um push em um Array
        this.termosDaBusca = new Subject_1.Subject();
    }
    ngOnInit() {
        //switchMap: considera apenas a última requisição do usuário. Ex: 
        //Se o usuário digitou Paulo, o switchMap irá fazer a requisição somente quando o usuário ter digitado a lentra 'o'
        //Ex2: Se o usuário buscou por 1 e na sequência buscou por 2 e o resultado da busca 2 retornou primeiro e logo depois o sistema retornou a busca 1
        //O switchMap vai considerar apenas a busca 2, pois ele considera apenas a última requisição, ou seja, ele considera a ordem original do pedido
        //distinctUntilChanged: Evita buscas repetidas. Ex: O usuário buscou por Ana, e o sistema retornou o resultado
        //Em sequência o usuário digita Paula e decide apagar e deixar somente Ana,
        //o distinctUntilChanged não irá deixar buscar novamente por Ana pois essa pesquisa já foi realizada e o reultado já foi retornado.
        this.contatos = this.termosDaBusca
            .debounceTime(500) //Aguarde por 300ms para emitir novos eventos
            .distinctUntilChanged() //Verifica a última busca realizada, se o próximo termo de busca for igual ao anterior ele deve ignorar
            .switchMap(term => term ? this.contatoService.search(term) : Observable_1.Observable.of([]))
            .catch(err => {
            console.log(err);
            return Observable_1.Observable.of([]);
        });
        //Não precisar usar mais o subscribe pois já está sendo usado o "| async" que faz o mesmo papel
        /*this.contatos.subscribe((contatos: Contato[]) => {
            console.log('Retornou do servidor: ', contatos);
         });*/
    }
    //SimpleChanges: vai trazer um objeto que contem as propriedades marcadas como @Input, que foram alteradas
    //Com ele é possível acessar o valor "atual" e o valor "anterior"
    //SimpleChange: 
    ngOnChanges(changes) {
        //Podemos verificar se o valor atual mudou em relação ao valor anterior
        //previousValue ou currentValue;
        let busca = changes['busca'];
        this.search(busca.currentValue);
    }
    search(termo) {
        //Adicionamos o valor do campo de busca ao Subject
        this.termosDaBusca.next(termo);
        //Precisamos emitir o evento do Output
        this.buscaChange.emit(termo);
    }
    verDetalhe(contato) {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ContatoBuscaComponent.prototype, "busca", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ContatoBuscaComponent.prototype, "buscaChange", void 0);
ContatoBuscaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contato-busca',
        templateUrl: 'contato-busca.component.html',
        styles: [`
        .cursor-pointer {
            cursor: pointer;
        }
    `]
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService,
        router_1.Router])
], ContatoBuscaComponent);
exports.ContatoBuscaComponent = ContatoBuscaComponent;
//# sourceMappingURL=contato-busca.component.js.map