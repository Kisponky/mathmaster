/// <reference types="cypress"/>

describe('Üzenteim', () => {
  it('Üzeneteim oldal elérése', () => {
    cy.visit('http://127.0.0.1:5500/index.html');


    cy.get('#bejelentkezes').should('not.be.visible');

    cy.get('[data-bs-target="#bejelentkezes"]').click();
    cy.get('#bejelentkezes').should('be.visible');


    cy.wait(500);

    cy.get('#emailL').type('tesztelek@example.com');
    cy.get('#passwordL').type('teszt123');


    cy.get('[type="button"][onclick="bejelentkez()"]').click();


    cy.get('#profilom').should('be.visible');
    cy.get('#profilom').click();
    cy.contains('Üzeneteim').should('be.visible');
    cy.contains('Üzeneteim').click();
    cy.url().should('include', '/messages.html');
  });

  it('Üzenet törlése', () => {
    cy.visit('http://127.0.0.1:5500/index.html');


    cy.get('#bejelentkezes').should('not.be.visible');

    cy.get('[data-bs-target="#bejelentkezes"]').click();
    cy.get('#bejelentkezes').should('be.visible');


    cy.wait(500);

    cy.get('#emailL').type('tesztelek@example.com');
    cy.get('#passwordL').type('teszt123');


    cy.get('[type="button"][onclick="bejelentkez()"]').click();


    cy.get('#profilom').should('be.visible');
    cy.get('#profilom').click();
    cy.contains('Üzeneteim').should('be.visible');
    cy.contains('Üzeneteim').click();
    cy.url().should('include', '/messages.html');


    cy.get('[onclick="torles(2)"]').click();
    cy.contains('Sikeres törlés!').should('be.visible');
  });

  it('Saját üzenetre kapott válasz', () => {
    cy.visit('http://127.0.0.1:5500/index.html');


    cy.get('#bejelentkezes').should('not.be.visible');

    cy.get('[data-bs-target="#bejelentkezes"]').click();
    cy.get('#bejelentkezes').should('be.visible');


    cy.wait(500);

    cy.get('#emailL').type('tesztelek@example.com');
    cy.get('#passwordL').type('teszt123');


    cy.get('[type="button"][onclick="bejelentkez()"]').click();


    cy.get('#profilom').should('be.visible');
    cy.get('#profilom').click();
    cy.contains('Üzeneteim').should('be.visible');
    cy.contains('Üzeneteim').click();
    cy.url().should('include', '/messages.html');


    cy.contains('Teszt Elek').should('be.visible');
  });
});