/// <reference types ="cypress"/>
import {
  VALID_PRODUCT_DATA,
  INVALID_PRODUCT_DATA,
  EXPIRATION_DATE_VALIDATE,
  WARNING_MESSAGES
} from '../fixtures/dataUtils';
import ProductRegistration from '../support/page/productRegistration/index';

describe('Tests on screen "teste-3".', () => {
  beforeEach(() => {
    cy.visit('./teste-3.html');
  });

  it('Test case 1 - successfully registering a product.', () => {
    //#region Registering product.
    ProductRegistration.registerProduct(
      VALID_PRODUCT_DATA.name,
      VALID_PRODUCT_DATA.price,
      VALID_PRODUCT_DATA.expirationDate
    );
    //#endregion

    //#region Validating that the product was registered in the first line of the table.
    ProductRegistration.validateProductRegistered(VALID_PRODUCT_DATA.name, 2);
    ProductRegistration.validateProductRegistered(VALID_PRODUCT_DATA.price, 3);
    ProductRegistration.validateProductRegistered(EXPIRATION_DATE_VALIDATE, 4);
    //#endregion
  });

  it('Test case 2 - do not register a product without values in the fields.', () => {
    //#region Clicking the "add" button without filling in values in the fields.
    ProductRegistration.clickButtonAdd();
    //#endregion

    //#region Validating that messages with invalid values appear and that the product has not been registered.
    ProductRegistration.validateInvalidDataMessage(
      WARNING_MESSAGES.name,
      0
    );
    ProductRegistration.validateInvalidDataMessage(
      WARNING_MESSAGES.price,
      1
    );
    ProductRegistration.validateInvalidDataMessage(
      WARNING_MESSAGES.expirationDate,
      2
    );
    ProductRegistration.validateThatThereIsNoProductOnTheTable();
    //#endregion
  });

  it('Test case 3 - do not register product with invalid name.', () => {
    //#region Trying to register a product with an invalid name.
    ProductRegistration.registerProduct(
      INVALID_PRODUCT_DATA.name,
      VALID_PRODUCT_DATA.price,
      VALID_PRODUCT_DATA.expirationDate
    );
    //#endregion

    //#region Validating that the invalid name message appeared and that the product was not registered.
    ProductRegistration.validateInvalidDataMessage(
      WARNING_MESSAGES.name,
      0
    );
    ProductRegistration.validateThatThereIsNoProductOnTheTable();
    //#endregion
  });

  it('Test case 4 - do not register product with invalid price.', () => {
    //#regionTrying to register a product with invalid price.
    ProductRegistration.registerProduct(
      VALID_PRODUCT_DATA.name,
      INVALID_PRODUCT_DATA.price,
      VALID_PRODUCT_DATA.expirationDate
    );
    //#endregion

    //#region Validating that the invalid price message appeared and that the product was not registered.
    ProductRegistration.validateInvalidDataMessage(
      WARNING_MESSAGES.price,
      1
    );
    ProductRegistration.validateThatThereIsNoProductOnTheTable();
    //#endregion
  });

  it('Test case 5 - do not register product with invalid validity.', () => {
    //#region Tentando cadastrar um produto com validade inválida.
    ProductRegistration.registerProduct(
      VALID_PRODUCT_DATA.name,
      VALID_PRODUCT_DATA.price,
      INVALID_PRODUCT_DATA.expirationDate
    );
    //#endregion

    //#region Validating that the invalid validity message appeared and that the product was not registered.
    ProductRegistration.validateInvalidDataMessage(
      WARNING_MESSAGES.expirationDate,
      2
    );
    ProductRegistration.validateThatThereIsNoProductOnTheTable();
    //#endregion
  });

  it('Test case 6 - do not register product with invalid data.', () => {
    //#region Tentando cadastrar um produto com dados inválidos.
    ProductRegistration.registerProduct(
      INVALID_PRODUCT_DATA.name,
      INVALID_PRODUCT_DATA.price,
      INVALID_PRODUCT_DATA.expirationDate
    );
    //#endregion

    //#region Validating that messages with invalid values appear and that the product has not been registered.
    ProductRegistration.validateInvalidDataMessage(
      WARNING_MESSAGES.name,
      0
    );
    ProductRegistration.validateInvalidDataMessage(
      WARNING_MESSAGES.price,
      1
    );
    ProductRegistration.validateInvalidDataMessage(
      WARNING_MESSAGES.expirationDate,
      2
    );
    ProductRegistration.validateThatThereIsNoProductOnTheTable();
    //#endregion
  });
});