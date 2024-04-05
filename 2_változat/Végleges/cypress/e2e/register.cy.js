/// <reference types="cypress"/>

describe('Bootstrap Modal Teszt', () => {
  it('Sikeres regisztráció!', () => {
    cy.visit('http://127.0.0.1:5500/index.html');


    cy.get('#regisztracio').should('not.be.visible');

    cy.get('[data-bs-target="#regisztracio"]').click();
    cy.get('#regisztracio').should('be.visible');


    cy.wait(500);

    cy.get('#fullName').type('Teszt Elek');
    cy.get('#userName').type('tesztelek');
    cy.get('#email').type('tesztelek@example.com');
    cy.get('#password').type('teszt123');
    cy.get('#password2').type('teszt123');


    cy.get('[type="button"][onclick="register()"]').click();

    cy.get('#regisztracio').should('not.be.visible');
  });

  it('Hiányzó adatok!', () => {
    cy.visit('http://127.0.0.1:5500/index.html');


    cy.get('#regisztracio').should('not.be.visible');

    cy.get('[data-bs-target="#regisztracio"]').click();
    cy.get('#regisztracio').should('be.visible');


    cy.wait(500);

    cy.get('[type="button"][onclick="register()"]').click();

    
    cy.contains('Hiányzó adat!').should('be.visible');
  });

  it('Érvénytelen email cím!', () => {
    cy.visit('http://127.0.0.1:5500/index.html');


    cy.get('#regisztracio').should('not.be.visible');

    cy.get('[data-bs-target="#regisztracio"]').click();
    cy.get('#regisztracio').should('be.visible');


    cy.wait(500);

    cy.get('#fullName').type('Teszt Elek');
    cy.get('#userName').type('tesztelek');
    cy.get('#email').type('tesztelekexamplecom');
    cy.get('#password').type('teszt123');
    cy.get('#password2').type('teszt123');


    cy.get('[type="button"][onclick="register()"]').click();

    
    cy.contains('Hibás email cím!').should('be.visible');
  });

  it('Nem megegyező jelszavak!', () => {
    cy.visit('http://127.0.0.1:5500/index.html');


    cy.get('#regisztracio').should('not.be.visible');

    cy.get('[data-bs-target="#regisztracio"]').click();
    cy.get('#regisztracio').should('be.visible');


    cy.wait(500);

    cy.get('#fullName').type('Teszt Elek');
    cy.get('#userName').type('tesztelek');
    cy.get('#email').type('tesztelek@example.com');
    cy.get('#password').type('teszt123');
    cy.get('#password2').type('teszt12');


    cy.get('[type="button"][onclick="register()"]').click();

    
    cy.contains('A jelszavak nem egyeznek!').should('be.visible');
  });
});