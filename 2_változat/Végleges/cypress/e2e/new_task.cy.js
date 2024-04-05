/// <reference types="cypress"/>

describe('Új feladat... kérdés szám tartomány', () => {
  it('Kvíz kérdések száma, érték: -1', () => {
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
    cy.contains('Új feladat...').should('be.visible');
    cy.contains('Új feladat...').click();
    cy.url().should('include', '/new_task.html');


    cy.get('#darabSzamInput').should('be.visible');
    cy.get('#darabSzamInput').type('-1');

    cy.get('select').select(1);
    cy.get('select').invoke('val').then(selectedValue => {
      cy.get('select option').eq(1).then(option => {
        expect(selectedValue).to.equal(option.val());
      });
    });

    cy.get('#formButton').click();

    cy.contains('Adj meg 1 és 10 közötti számot és válaszd ki az osztályt').should('be.visible');
  });

  it('Kvíz kérdések száma, érték: 1', () => {
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
    cy.contains('Új feladat...').should('be.visible');
    cy.contains('Új feladat...').click();
    cy.url().should('include', '/new_task.html');


    cy.get('#darabSzamInput').should('be.visible');
    cy.get('#darabSzamInput').type('1');

    cy.get('select').select(1);
    cy.get('select').invoke('val').then(selectedValue => {
      cy.get('select option').eq(1).then(option => {
        expect(selectedValue).to.equal(option.val());
      });
    });

    cy.get('#formButton').click();

    cy.contains('Kérlek tölts ki minden mezőt!').should('be.visible');
  });

  it('Kvíz kérdések száma, érték: 5', () => {
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
    cy.contains('Új feladat...').should('be.visible');
    cy.contains('Új feladat...').click();
    cy.url().should('include', '/new_task.html');


    cy.get('#darabSzamInput').should('be.visible');
    cy.get('#darabSzamInput').type('5');

    cy.get('select').select(1);
    cy.get('select').invoke('val').then(selectedValue => {
      cy.get('select option').eq(1).then(option => {
        expect(selectedValue).to.equal(option.val());
      });
    });

    cy.get('#formButton').click();

    cy.contains('Kérlek tölts ki minden mezőt!').should('be.visible');
  });

  it('Kvíz kérdések száma, érték: 10', () => {
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
    cy.contains('Új feladat...').should('be.visible');
    cy.contains('Új feladat...').click();
    cy.url().should('include', '/new_task.html');


    cy.get('#darabSzamInput').should('be.visible');
    cy.get('#darabSzamInput').type('10');

    cy.get('select').select(1);
    cy.get('select').invoke('val').then(selectedValue => {
      cy.get('select option').eq(1).then(option => {
        expect(selectedValue).to.equal(option.val());
      });
    });

    cy.get('#formButton').click();

    cy.contains('Kérlek tölts ki minden mezőt!').should('be.visible');
  });

  it('Kvíz kérdések száma, érték: 11', () => {
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
    cy.contains('Új feladat...').should('be.visible');
    cy.contains('Új feladat...').click();
    cy.url().should('include', '/new_task.html');


    cy.get('#darabSzamInput').should('be.visible');
    cy.get('#darabSzamInput').type('11');

    cy.get('select').select(1);
    cy.get('select').invoke('val').then(selectedValue => {
      cy.get('select option').eq(1).then(option => {
        expect(selectedValue).to.equal(option.val());
      });
    });

    cy.get('#formButton').click();

    cy.contains('Adj meg 1 és 10 közötti számot és válaszd ki az osztályt').should('be.visible');
  });
});



describe('Új feladat... feltöltése', () => {
  it('Új feladat... kérdések és válaszok megadása', () => {
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
    cy.contains('Új feladat...').should('be.visible');
    cy.contains('Új feladat...').click();
    cy.url().should('include', '/new_task.html');


    cy.get('#darabSzamInput').should('be.visible');
    cy.get('#darabSzamInput').type('3');

    cy.get('select').select(1);

    cy.get('#formButton').click();

    cy.contains('Kérlek tölts ki minden mezőt!').should('be.visible');
    cy.wait(500);
    cy.contains('OK').click();

    cy.wait(500);
    cy.get('#kerdes1').type('Hány elemű a sorozat: 1, 5, 9, 13?');
    cy.get('#valaszA1').type('1');
    cy.get('#valaszB1').type('2');
    cy.get('#valaszC1').type('3');
    cy.get('#valaszD1').type('4');
    cy.get('input[type="radio"][id="helyesValaszA1"][value="1"]').click();

    cy.get('#formButton').click();


    cy.wait(500);
    cy.get('#kerdes2').type('Mi a sorozat következő eleme: 6, 8, 10, 12, ___?');
    cy.get('#valaszA2').type('20');
    cy.get('#valaszB2').type('17');
    cy.get('#valaszC2').type('15');
    cy.get('#valaszD2').type('14');
    cy.get('input[type="radio"][id="helyesValaszD2"][value="4"]').click();

    cy.get('#formButton').click();


    cy.wait(500);
    cy.get('#kerdes3').type('Mennyivel növekszik a sorozat: 2, 5, 8, 11?');
    cy.get('#valaszA3').type('1');
    cy.get('#valaszB3').type('2');
    cy.get('#valaszC3').type('3');
    cy.get('#valaszD3').type('4');
    cy.get('input[type="radio"][id="helyesValaszC3"][value="3"]').click();

    cy.get('#formButton').click();




    cy.wait(500);
    cy.get('#kerdes1').should('have.value', 'Hány elemű a sorozat: 1, 5, 9, 13?');
    cy.get('#valaszA1').should('have.value', '1');
    cy.get('#valaszB1').should('have.value', '2');
    cy.get('#valaszC1').should('have.value', '3');
    cy.get('#valaszD1').should('have.value', '4');
    cy.get('input[type="radio"][id="helyesValaszA1"][value="1"]').should('be.checked');


    cy.get('#kerdes2').should('have.value', 'Mi a sorozat következő eleme: 6, 8, 10, 12, ___?');
    cy.get('#valaszA2').should('have.value', '20');
    cy.get('#valaszB2').should('have.value', '17');
    cy.get('#valaszC2').should('have.value', '15');
    cy.get('#valaszD2').should('have.value', '14');
    cy.get('input[type="radio"][id="helyesValaszD2"][value="4"]').should('be.checked');


    cy.get('#kerdes3').should('have.value', 'Mennyivel növekszik a sorozat: 2, 5, 8, 11?');
    cy.get('#valaszA3').should('have.value', '1');
    cy.get('#valaszB3').should('have.value', '2');
    cy.get('#valaszC3').should('have.value', '3');
    cy.get('#valaszD3').should('have.value', '4');
    cy.get('input[type="radio"][id="helyesValaszC3"][value="3"]').should('be.checked');


    cy.get('[type="button"][onclick="checkInput()"]').click();
    cy.contains('Sikeres feltöltés');
  });
});