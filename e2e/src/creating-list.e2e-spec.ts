import { AppPage } from './app.po';
import { browser, ElementFinder, logging } from 'protractor';

describe('workspace-project App', () => {
  const listName: string = "__testlist";
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should create list collection', () => {
    page.navigateTo();
    page.ListCollectionTextField().sendKeys(listName); 
    page.ListCollectionAddButton().click();
  });

  it('should create list', () => {
    browser.waitForAngularEnabled(false);
    browser.sleep(100);
    page.CreateListButton().click();
    browser.sleep(100);
    page.CancelButton().click();
    browser.sleep(100);
  });

  it('should add row', () => {
    page.AddRowButton().click();
    page.addRowTextArea().sendKeys("test\n");
    browser.sleep(100);
  });

  it('should mark row', () => {
    page.rowsDoneCheckboxes().first().click();
    expect(page.rowsDoneCheckboxes().first().isSelected());
  });

  it('should unmark row', () => {
    browser.sleep(100);
    page.rowsDoneCheckboxes().first().click();
    expect(!page.rowsDoneCheckboxes().first().isSelected());    
  });

  it('should remove row', () => {
    browser.sleep(100);
    page.rowsDeleteButtons().first().click();
  });

  it('should remove list', () => {
    page.list().click();
    page.deleteButton().click();
  });

  it('should remove list collection', () => {
    page.homeLink().click();
    browser.sleep(100);
    expect(page.ListCollections().first().getText()).toContain(listName);
    page.listCollectionsDeketeButton().first().click();
    browser.switchTo().alert().accept();
  });
  
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
