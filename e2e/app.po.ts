import { browser, element, by } from 'protractor';

export class HonbotPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('hb-root legend')).getText();
  }
}
