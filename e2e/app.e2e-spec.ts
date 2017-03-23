import { HonbotPage } from './app.po';

describe('honbot App', () => {
  let page: HonbotPage;

  beforeEach(() => {
    page = new HonbotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect<any>(page.getParagraphText()).toEqual('Live on Twitch:');
  });
});
