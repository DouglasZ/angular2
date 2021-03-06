import { Injectable } from '@angular/core';

import { Http, Headers, Response } from '@angular/http';

//A implementação de observable no angular é simples, ou seja, o angular não tem um operador próprio (toPromise)
//Para converter o observable para o toPromise, por isso é preciso importar de uma biblioteca externa (rxjs) ou outras
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';
import { ServiceInterface } from './../interfaces/service.interface';

// Mit metadadados do angular 2 para que possa identificar outras dependências do ContatoService 
// e fazer a injeção das independências de forma correta

// Identifica que é uma classe de serviço
// O @Injectable não afirma que esta classe é realmente um serviço 
// Mas diz que, este serviço pode depender de outros serviços por isso é preciso usar o @Injectable
// Para que o sistema de injeção de dependências do angular consiga buscar as dependências desta classe
@Injectable() 
export class ContatoService implements ServiceInterface<Contato>{

    private contatosUrl: string = 'app/contatos';
    private headers: Headers = new Headers({'Content-Type': 'application/json'})

    constructor(
        private http: Http
    ){}

    findAll(): Promise<Contato[]> {
        return this.http.get(this.contatosUrl)
            .toPromise()
            .then(response => response.json().data as Contato[])
            .catch(this.handleError);
    }

    find(id: number): Promise<Contato> {
        return this.findAll()
            .then((contatos: Contato[]) => contatos.find(contato => contato.id === id));
    }

    create(contato: Contato): Promise<Contato> {
        return this.http
            .post(this.contatosUrl, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then((response: Response) => response.json().data as Contato)
            .catch(this.handleError);
    }

    update(contato: Contato): Promise<Contato> {
        const url = `${this.contatosUrl}/${contato.id}`; //app/contatos/:id
        return this.http
            .put(url, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handleError);
    }

    delete(contato: Contato): Promise<Contato> {
        const url = `${this.contatosUrl}/${contato.id}`; //app/contatos/:id
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handleError);
    }

    private handleError(err: any): Promise<any> {
        console.log('Error: ', err);
        return Promise.reject(err.message || err);
    }

    getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        })
        .then(() => {
            console.log('Primeiro then');
            return 'Curso Angular 2';
        })
        .then((param: string) => {
            console.log('segundo then');
            console.log(param);

            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    console.log('Continuando depois de 4 segundos...');
                    resolve2();
                },4000);
            });
        })
        .then(() => {
            console.log('Terceiro then');
            return this.findAll();
        });
    }

    //Observable
    search(term: string): Observable<Contato[]> {
        return this.http
            .get(`${this.contatosUrl}/?nome=${term}`)
            .map((res: Response) => res.json().data as Contato[]);
    }
}