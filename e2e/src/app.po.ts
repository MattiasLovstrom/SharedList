import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class AppPage {
  homeLink() : ElementFinder {
    return element(by.className("homenav"));
  }
  deleteButton() : ElementFinder {
    return element(by.id("delete"));
  }
  list() : ElementFinder {
    return element(by.css("a strong"));
  }
  
  public CreateListButton(){
    return element(by.id("create-list"));
  }

  public AddRowButton(){
    return element(by.id("add-row"));
  }

  public addRowTextArea(){
    return element(by.css("textarea"));
  }

  public rowsDoneCheckboxes() : ElementArrayFinder
  {
    return element.all(by.css('.row input'));
  }

  public rowsDeleteButtons() : ElementArrayFinder
  {
    return element.all(by.css('.row button'));
  }

  public done(){
    return element("input");
  }
  


  public CancelButton(){
    return element(by.id("cancel"));
  }

  public ListCollectionTextField() : ElementFinder
  {
    return element(by.css('input[name="name"]'));
  }
  
  public ListCollectionAddButton() : ElementFinder
  {
    return element(by.css('form button'));
  }

  listCollectionsDeketeButton() {
    return element.all(by.css('li button'));
  }


  public ListCollections() : ElementArrayFinder
  {
    return element.all(by.css('li'));
  }

  
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('list-collections h1')).getText() as Promise<string>;
  }
  
  getListsCount() {
    return element.all(by.css('li')).count() as Promise<number>;
  }

  clickLastOfLists() {
    element.all(by.css('li a')).last().click();
  }

  clickMore() {
    element(by.id('more')).click();
  }

  urlChanged () {
    return function () {
      return browser.getCurrentUrl().then(function(actualUrl) {
        return browser.baseUrl != actualUrl;
      });
    };
  };
}
