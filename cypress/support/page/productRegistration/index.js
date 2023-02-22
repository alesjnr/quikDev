/// <reference types ="cypress"/>
import { ELEMENTS_PRODUCT_REGISTRATION } from './elements';

class ProductRegistration {
    registerProduct(name, price, expirationDate) {
        cy.get(ELEMENTS_PRODUCT_REGISTRATION.inputName).type(name);
        cy.get(ELEMENTS_PRODUCT_REGISTRATION.inputPrice).type(price);
        cy.get(ELEMENTS_PRODUCT_REGISTRATION.inputExpirationDate).type(expirationDate);
        this.clickButtonAdd();
    }

    clickButtonAdd() {
        cy.get(ELEMENTS_PRODUCT_REGISTRATION.buttonAdd).click();
    }

    validateProductRegistered(value, indexColumn) {
        cy.get(ELEMENTS_PRODUCT_REGISTRATION.tableProducts)
            .find('tr').eq(0).find(`td:nth-child(${indexColumn})`)
            .should('contain.text', value);
    }

    validateInvalidDataMessage(text, indexColumn) {
        cy.get(ELEMENTS_PRODUCT_REGISTRATION.divInput)
            .eq(indexColumn).find(ELEMENTS_PRODUCT_REGISTRATION.divWarning)
            .should('contain.text', text)
            .should('be.visible');
    }

    validateThatThereIsNoProductOnTheTable() {
        cy.get('td').should('not.exist');
    }
}

export default new ProductRegistration();
