import { HonbotFrontendPage } from './app.po';

describe('honbot-frontend App', function() {
  let page: HonbotFrontendPage;

  beforeEach(() => {
    page = new HonbotFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
