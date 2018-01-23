import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

    //Parametro opicional, então usa-se o ? (Pode ter mensagem ou não)
    confirm(message?: string) {
        return new Promise(resolve => {
            return resolve(window.confirm(message || 'Confirmar?'));
        });
    }
}