/// <reference types="cypress"/>

describe('Bootstrap Modal Teszt', () => {
  it('Sikeres üzenet küldés általános felhasználói fiókkal!', () => {
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


    cy.get('[data-bs-target="#uzenet"]').click();
    cy.get('#uzenet').should('be.visible');

    cy.wait(500);

    cy.get('#text').type('Ez egy teszt üzenet az üzenet küldés modalban!');
    cy.get('[type="button"][onclick="uzenet()"]').click();

    cy.contains('Az üzenet sikeresen elküldve!').should('be.visible');
  });

  it('Üres szövegmezőre figyelmeztetés általános felhasználói fiókkal!', () => {
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


    cy.get('[data-bs-target="#uzenet"]').click();
    cy.get('#uzenet').should('be.visible');

    
    cy.get('[type="button"][onclick="uzenet()"]').click();

    cy.contains('Az üzenet nincs megadva!').should('be.visible');
  });

  it('Nem engedélyezett karakter használata általános felhasználói fiókkal!', () => {
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


    cy.get('[data-bs-target="#uzenet"]').click();
    cy.get('#uzenet').should('be.visible');

    cy.wait(500);

    cy.get('#text').type('Az kvíz feladatban hibás az egyik kérdés, a 10>8-nál és az oldalon ez így van megadva: 10<8.');
    cy.get('[type="button"][onclick="uzenet()"]').click();

    cy.contains('Hibás karakter az üzenetben!').should('be.visible');
  });
});