import { HonbotPage } from './app.po';

describe('honbot App', () => {
  let page: HonbotPage;

  beforeEach(() => {
    page = new HonbotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
