import { browser, by, element } from 'protractor';

export class ExistingListsPage {
  
  navigateTo() {
    return browser.get(browser.baseUrl + 'traningslogg_20200702_100155') as Promise<any>;
  }

  getRowsCount() {
    return element.all(by.css('.row')).count() as Promise<number>;
  }

  clickMore() {
    element(by.id('more')).click();
  }
}
