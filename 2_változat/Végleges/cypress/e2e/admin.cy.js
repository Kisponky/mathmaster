/// <reference types="cypress"/>

describe('Admin', () => {
  it('Admin oldal elérése', () => {
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
  });

  it('Válasz üzenet küldése', () => {
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


    cy.get('[onclick="valaszInputMezo(1)"]').click();
    cy.get('#inputMezo1').should('be.visible');
    cy.get('#inputMezo1').type('Ez egy válasz üzenet az adminisztrátoroktól!');
    cy.get('[onclick="valaszKuldes(1)"]').click();
  });

  it('Üzenet törlése', () => {
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

    cy.get('[onclick="torles(2)"]').click();
    cy.contains('Sikeres törlés!').should('be.visible');
  });
});