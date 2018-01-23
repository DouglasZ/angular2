import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles: [`
        .cursor-pointer {
            cursor: pointer;
        }
    `]
})

export class ContatoBuscaComponent implements OnInit, OnChanges {

    //Via de entrada de dados para o componente
    @Input() busca: string;

    //Para que esse evento funcione é preciso sempre ter o Change no nome da variavel. Ex: Input: x Output xChange
    //Caso o Input tivesse o nome serach o Output ficaria "seachChange"
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();
    contatos: Observable<Contato[]>;
    //Subject: Produtor de fluxo de eventos observáveis, ou seja, teremos um outro Observable 
    //Toda vez que o usuário digitar uma busca no campo, vamos adicionar essa busca ao subject, pois ele gerencia esse fluxo de eventos. Ex:
    //É como se tivéssemos dando um push em um Array
    private termosDaBusca: Subject<string> = new Subject<string>();

    constructor(
        private contatoService: ContatoService,
        private router: Router
    ) { }

    ngOnInit(): void {
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
            .switchMap(term => term ? this.contatoService.search(term) : Observable.of<Contato[]>([]))
            .catch(err => {
                console.log(err);
                return Observable.of<Contato[]>([]);
            });

            //Não precisar usar mais o subscribe pois já está sendo usado o "| async" que faz o mesmo papel
            /*this.contatos.subscribe((contatos: Contato[]) => {
                console.log('Retornou do servidor: ', contatos);
             });*/
    }

    //SimpleChanges: vai trazer um objeto que contem as propriedades marcadas como @Input, que foram alteradas
    //Com ele é possível acessar o valor "atual" e o valor "anterior"
    //SimpleChange: 
    ngOnChanges(changes: SimpleChanges): void {
        //Podemos verificar se o valor atual mudou em relação ao valor anterior
        //previousValue ou currentValue;
        let busca: SimpleChange = changes['busca'];
        this.search(busca.currentValue);
    }

    search(termo: string): void {
        //Adicionamos o valor do campo de busca ao Subject
        this.termosDaBusca.next(termo);
        //Precisamos emitir o evento do Output
        this.buscaChange.emit(termo);
    }

    verDetalhe(contato: Contato): void {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }
}