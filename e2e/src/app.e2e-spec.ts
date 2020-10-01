import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Existing list collections', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('List collections');
  });

  it('should exists lists', () => {
    expect(page.getListsCount()).toBeGreaterThan(3);
  });

  it('should exists lists', () => {
    expect(page.getListsCount()).toBeGreaterThan(3);
  });

  it('should be possible to navigate to first list', () => {
    page.clickLastOfLists();
    browser.wait(page.urlChanged, 500);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
