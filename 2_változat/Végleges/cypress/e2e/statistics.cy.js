/// <reference types="cypress"/>

describe('Statisztika oldal elérése a kezdőlapról', () => {
  it('Statisztika oldal elérése', () => {
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
    cy.contains('Statisztika').should('be.visible');
    cy.contains('Statisztika').click();
    cy.url().should('include', '/statistics.html');
  });
});


describe('Statisztika oldal elérése test.html-ről', () => {
  it('Statisztika oldal elérése', () => {
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
    

    cy.get('[type="button"][onclick="osztaly(1)"]').click();
    cy.url().should('include', '/quiz_selector.html');


    cy.get('a.btn-danger[title="Teszt kitöltése"]').click();
    cy.url().should('include', 'test.html');


    cy.get('input[type="text"][style="width: 38px; margin: 0px 3px 0px 1px; padding: 3px 5px; text-align: center; display: inline-block; border-radius: 5px;"]').should('be.visible');
    
    cy.get('span').should('be.visible');


    cy.get('#profilom').should('be.visible');
    cy.get('#profilom').click();
    cy.contains('Statisztika').should('be.visible');
    cy.contains('Statisztika').click();
    cy.url().should('include', '/statistics.html');
  });
});


describe('Statisztika oldal tartalmának betöltése', () => {
  it('Chart.js-ek tartalma betöltödik', () => {
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
    cy.contains('Statisztika').should('be.visible');
    cy.contains('Statisztika').click();
    cy.url().should('include', '/statistics.html');


    cy.get('#myChart').should('be.visible');
    cy.get('#szazalekChart').should('be.visible');
  });
});