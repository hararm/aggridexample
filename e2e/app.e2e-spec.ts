import { AggridexamplePage } from './app.po';

describe('aggridexample App', () => {
  let page: AggridexamplePage;

  beforeEach(() => {
    page = new AggridexamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
