import { ExistingListsPage } from './existing-lists.po';
import { browser, logging } from 'protractor';

describe('Existing lists', () => {
  let page: ExistingListsPage;

  beforeEach(() => {
    page = new ExistingListsPage();
  });

  it('should have rows', () => {
    browser.waitForAngularEnabled(false);
    page.navigateTo();
    browser.sleep(500);
    expect(page.getRowsCount()).toBeGreaterThan(2);
    page.clickMore();
    browser.sleep(500);
    expect(page.getRowsCount()).toBeGreaterThan(20);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
