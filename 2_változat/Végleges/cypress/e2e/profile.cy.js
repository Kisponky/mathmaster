/// <reference types="cypress"/>

/*Ezt a tesztet futattva megváltoznak a profil adatok így a bejelentkezés nem lesz lehetséges a további 
tesztek futtatásakor csak abban az esetben, ha módosítjuk azokat a megfelelő helyen*/
describe('Profil adatok módosítása', () => {
  it('Felhasználónév megváltoztatása', () => {
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
    cy.contains('Beállítások').should('be.visible');
    cy.contains('Beállítások').click();
    cy.url().should('include', '/profile.html');


    cy.get('#userName').type('teszt');
    cy.get('[type="button"][onclick="updateUsername()"]').click();
    cy.contains('Felhasználónév sikeresen frissítve!').should('be.visible');
  });

  it('Email cím módosítása', () => {
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
    cy.contains('Beállítások').should('be.visible');
    cy.contains('Beállítások').click();
    cy.url().should('include', '/profile.html');


    cy.get('#userMail').type('teszt@example.com');
    cy.get('[type="button"][onclick="updateEmail()"]').click();
    cy.contains('Email cím sikeresen frissítve!').should('be.visible');
  });

  it('Jelszó módosítása', () => {
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
    cy.contains('Beállítások').should('be.visible');
    cy.contains('Beállítások').click();
    cy.url().should('include', '/profile.html');


    cy.get('#oldPw').type('teszt123');
    cy.get('#newPw').type('tesztelek');
    cy.get('#newPw2').type('tesztelek');
    cy.get('[type="button"][onclick="changePassword()"]').click();
    cy.contains('Jelszó sikeresen megváltoztatva!').should('be.visible');
  });

  it('Profil törlése', () => {
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
    cy.contains('Beállítások').should('be.visible');
    cy.contains('Beállítások').click();
    cy.url().should('include', '/profile.html');


    cy.get('[onclick="deleteUserProfile()"]').click();
    cy.contains('Biztos vagy benne?').should('be.visible');
    cy.contains('Igen, töröld!').click();
  });
});