import { AngularCliPage } from './app.po';

describe('angular-cli App', () => {
  let page: AngularCliPage;

  beforeEach(() => {
    page = new AngularCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });

  it('deve exibir parágrafo com mensagem \'initial message\'', () => {
    page.navigateTo();
    expect(page.getMessageText()).toEqual('initial message');
  });

  it('deve exibir parágrafo com mensagem \'second message\'', () => {
    page.navigateTo();
    page.changeMessage();
    expect(page.getMessageText()).toEqual('second message');
  });

});
