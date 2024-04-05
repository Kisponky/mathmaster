/// <reference types="cypress"/>

describe('Kvíz oldal 1. osztály', () => {
  it('Eredmény tesztelése', () => {
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


    cy.get('a.btn-danger[title="Kvíz kitöltése"]').click();
    cy.url().should('include', 'quiz.html');


    cy.get('#valasz1').click();

    cy.get('#valasz1').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });


    cy.get('#valasz2').click();

    cy.get('#valasz2').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });


    cy.get('#valasz3').click();

    cy.get('#valasz3').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });


    cy.get('#valasz4').click();

    cy.get('#valasz4').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });
  });
});



describe('Kvíz oldal 2. osztály', () => {
  it('Eredmény tesztelése', () => {
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


    cy.get('[type="button"][onclick="osztaly(2)"]').click();
    cy.url().should('include', '/quiz_selector.html');


    cy.get('a.btn-danger[title="Kvíz kitöltése"]').click();
    cy.url().should('include', 'quiz.html');


    cy.get('#valasz1').click();

    cy.get('#valasz1').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });


    cy.get('#valasz2').click();

    cy.get('#valasz2').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });


    cy.get('#valasz3').click();

    cy.get('#valasz3').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });


    cy.get('#valasz4').click();

    cy.get('#valasz4').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });
  });
});




describe('Kvíz oldal 3. osztály', () => {
  it('Eredmény tesztelése', () => {
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


    cy.get('[type="button"][onclick="osztaly(3)"]').click();
    cy.url().should('include', '/quiz_selector.html');


    cy.get('a.btn-danger[title="Kvíz kitöltése"]').click();
    cy.url().should('include', 'quiz.html');


    cy.get('#valasz1').click();

    cy.get('#valasz1').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });


    cy.get('#valasz2').click();

    cy.get('#valasz2').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });


    cy.get('#valasz3').click();

    cy.get('#valasz3').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });


    cy.get('#valasz4').click();

    cy.get('#valasz4').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });
  });
});




describe('Kvíz oldal 4. osztály', () => {
  it('Eredmény tesztelése', () => {
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


    cy.get('[type="button"][onclick="osztaly(4)"]').click();
    cy.url().should('include', '/quiz_selector.html');


    cy.get('a.btn-danger[title="Kvíz kitöltése"]').click();
    cy.url().should('include', 'quiz.html');


    cy.get('#valasz1').click();

    cy.get('#valasz1').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });


    cy.get('#valasz2').click();

    cy.get('#valasz2').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });


    cy.get('#valasz3').click();

    cy.get('#valasz3').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });


    cy.get('#valasz4').click();

    cy.get('#valasz4').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz')) {
        cy.wait(1000);
        cy.contains('Jó válasz!').should('be.visible');
      } else if (resultText.includes('Rossz válasz')) {
        cy.wait(1000);
        cy.contains('Rossz válasz!').should('be.visible');
      }
    });
  });
});