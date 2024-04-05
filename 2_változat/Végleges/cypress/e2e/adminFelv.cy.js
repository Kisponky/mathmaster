/// <reference types="cypress"/>

describe('Admin felvétel', () => {
  it('Admin felvétel', () => {
    cy.visit('http://127.0.0.1:5500/index.html');


    cy.get('#bejelentkezes').should('not.be.visible');

    cy.get('[data-bs-target="#bejelentkezes"]').click();
    cy.get('#bejelentkezes').should('be.visible');


    cy.wait(500);

    cy.get('#emailL').type('tamasnadas04@gmail.com');
    cy.get('#passwordL').type('asd123');


    cy.get('[type="button"][onclick="bejelentkez()"]').click();


    cy.get('#profilom').should('be.visible');
    cy.get('#profilom').click();
    cy.contains('Admin').should('be.visible');
    cy.contains('Admin').click();
    cy.url().should('include', '/admin.html');


    cy.get('#adminModal').should('not.be.visible');

    cy.get('[data-bs-target="#adminModal"]').click();
    cy.get('#adminModal').should('be.visible');


    cy.wait(500);

    cy.get('#ujAdminEmail').type('tesztelek@example.com');


    cy.get('[type="button"][onclick="adminFelvetel()"]').click();
    cy.contains('Sikeres admin felvétel!').should('be.visible');
  });
});