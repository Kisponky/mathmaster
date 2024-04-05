/// <reference types="cypress"/>

describe('Vizsgálati napló', () => {
  it('Vizsgálati napló elérése, táblázat megjelenése', () => {
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
    cy.contains('Vizsgálati napló').click();
    cy.url().should('include', '/vizsgalati_naplo.html');

    cy.get('table').should('be.visible');
  });

  it('Szűrés a válasz üzenetekre', () => {
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
    cy.contains('Vizsgálati napló').click();
    cy.url().should('include', '/vizsgalati_naplo.html');

    cy.get('table').should('be.visible');


    cy.get('select').select(2);
    cy.get('select').invoke('val').then(selectedValue => {
      cy.get('select option').eq(2).then(option => {
        expect(selectedValue).to.equal(option.val());
      });
    });
  });
});