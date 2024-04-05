/// <reference types="cypress"/>

describe('Matematikai tesztek', () => {
  it('Ellenőrizzük az eredmény tartományát és helyességét 1. osztálynál', () => {
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


    cy.get('span').should('be.visible').then($span => {
      const text = $span.text();
      const numbers = text.match(/\d+/g);
    
      numbers.forEach(number => {
        const parsedNumber = parseInt(number);
        expect(parsedNumber).to.be.within(0, 20);
      });
    });

    
    cy.get('input[type="text"][style="width: 38px; margin: 0px 3px 0px 1px; padding: 3px 5px; text-align: center; display: inline-block; border-radius: 5px;"]').type('-1');

    cy.get('#Ellenorzes').click();

    cy.contains('Eredmény').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz') || resultText.includes('Rossz válasz')) {
        cy.get('#Ellenorzes').then($result => {
          const resultText = $result.text();
          const resultNumber = parseInt(resultText);
          expect(resultNumber).to.be.within(0, 20);
        });
      }
    });


    cy.get('input[type="text"][style="width: 38px; margin: 0px 3px 0px 1px; padding: 3px 5px; text-align: center; display: inline-block; border-radius: 5px;"]').type('0');

    cy.get('#Ellenorzes').click();

    cy.contains('Eredmény').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz') || resultText.includes('Rossz válasz')) {
        cy.get('#Ellenorzes').then($result => {
          const resultText = $result.text();
          const resultNumber = parseInt(resultText);
          expect(resultNumber).to.be.within(0, 20);
        });
      }
    });


    cy.get('input[type="text"][style="width: 38px; margin: 0px 3px 0px 1px; padding: 3px 5px; text-align: center; display: inline-block; border-radius: 5px;"]').type('10');

    cy.get('#Ellenorzes').click();

    cy.contains('Eredmény').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz') || resultText.includes('Rossz válasz')) {
        cy.get('#Ellenorzes').then($result => {
          const resultText = $result.text();
          const resultNumber = parseInt(resultText);
          expect(resultNumber).to.be.within(0, 20);
        });
      }
    });


    cy.get('input[type="text"][style="width: 38px; margin: 0px 3px 0px 1px; padding: 3px 5px; text-align: center; display: inline-block; border-radius: 5px;"]').type('17');

    cy.get('#Ellenorzes').click();

    cy.contains('Eredmény').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz') || resultText.includes('Rossz válasz')) {
        cy.get('#Ellenorzes').then($result => {
          const resultText = $result.text();
          const resultNumber = parseInt(resultText);
          expect(resultNumber).to.be.within(0, 20);
        });
      }
    });


    cy.get('input[type="text"][style="width: 38px; margin: 0px 3px 0px 1px; padding: 3px 5px; text-align: center; display: inline-block; border-radius: 5px;"]').type('20');

    cy.get('#Ellenorzes').click();

    cy.contains('Eredmény').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz') || resultText.includes('Rossz válasz')) {
        cy.get('#Ellenorzes').then($result => {
          const resultText = $result.text();
          const resultNumber = parseInt(resultText);
          expect(resultNumber).to.be.within(0, 20);
        });
      }
    });


    cy.get('input[type="text"][style="width: 38px; margin: 0px 3px 0px 1px; padding: 3px 5px; text-align: center; display: inline-block; border-radius: 5px;"]').type('21');

    cy.get('#Ellenorzes').click();

    cy.contains('Eredmény').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz') || resultText.includes('Rossz válasz')) {
        cy.get('#Ellenorzes').then($result => {
          const resultText = $result.text();
          const resultNumber = parseInt(resultText);
          expect(resultNumber).to.be.within(0, 20);
        });
      }
    });
  });


  it('Ellenőrizzük az eredmény tartományát és helyességét 2. osztálynál', () => {
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


    cy.get('a.btn-danger[title="Teszt kitöltése"]').click();
    cy.url().should('include', 'test.html');


    cy.get('input[type="text"][style="width: 38px; margin: 0px 3px 0px 1px; padding: 3px 5px; text-align: center; display: inline-block; border-radius: 5px;"]').should('be.visible');
    
    cy.get('span').should('be.visible');


    cy.get('span').should('be.visible').then($span => {
      const text = $span.text();
      const numbers = text.match(/\d+/g);
    
      numbers.forEach(number => {
        const parsedNumber = parseInt(number);
        expect(parsedNumber).to.be.within(0, 100);
      });
    });

    
    cy.get('input[type="text"][style="width: 38px; margin: 0px 3px 0px 1px; padding: 3px 5px; text-align: center; display: inline-block; border-radius: 5px;"]').type('-1');

    cy.get('#Ellenorzes').click();

    cy.contains('Eredmény').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz') || resultText.includes('Rossz válasz')) {
        cy.get('#Ellenorzes').then($result => {
          const resultText = $result.text();
          const resultNumber = parseInt(resultText);
          expect(resultNumber).to.be.within(0, 100);
        });
      }
    });


    cy.get('input[type="text"][style="width: 38px; margin: 0px 3px 0px 1px; padding: 3px 5px; text-align: center; display: inline-block; border-radius: 5px;"]').type('0');

    cy.get('#Ellenorzes').click();

    cy.contains('Eredmény').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz') || resultText.includes('Rossz válasz')) {
        cy.get('#Ellenorzes').then($result => {
          const resultText = $result.text();
          const resultNumber = parseInt(resultText);
          expect(resultNumber).to.be.within(0, 100);
        });
      }
    });


    cy.get('input[type="text"][style="width: 38px; margin: 0px 3px 0px 1px; padding: 3px 5px; text-align: center; display: inline-block; border-radius: 5px;"]').type('28');

    cy.get('#Ellenorzes').click();

    cy.contains('Eredmény').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz') || resultText.includes('Rossz válasz')) {
        cy.get('#Ellenorzes').then($result => {
          const resultText = $result.text();
          const resultNumber = parseInt(resultText);
          expect(resultNumber).to.be.within(0, 100);
        });
      }
    });


    cy.get('input[type="text"][style="width: 38px; margin: 0px 3px 0px 1px; padding: 3px 5px; text-align: center; display: inline-block; border-radius: 5px;"]').type('58');

    cy.get('#Ellenorzes').click();

    cy.contains('Eredmény').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz') || resultText.includes('Rossz válasz')) {
        cy.get('#Ellenorzes').then($result => {
          const resultText = $result.text();
          const resultNumber = parseInt(resultText);
          expect(resultNumber).to.be.within(0, 100);
        });
      }
    });


    cy.get('input[type="text"][style="width: 38px; margin: 0px 3px 0px 1px; padding: 3px 5px; text-align: center; display: inline-block; border-radius: 5px;"]').type('100');

    cy.get('#Ellenorzes').click();

    cy.contains('Eredmény').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz') || resultText.includes('Rossz válasz')) {
        cy.get('#Ellenorzes').then($result => {
          const resultText = $result.text();
          const resultNumber = parseInt(resultText);
          expect(resultNumber).to.be.within(0, 100);
        });
      }
    });


    cy.get('input[type="text"][style="width: 38px; margin: 0px 3px 0px 1px; padding: 3px 5px; text-align: center; display: inline-block; border-radius: 5px;"]').type('101');

    cy.get('#Ellenorzes').click();

    cy.contains('Eredmény').should('be.visible').then($result => {
      const resultText = $result.text();
      if (resultText.includes('Jó válasz') || resultText.includes('Rossz válasz')) {
        cy.get('#Ellenorzes').then($result => {
          const resultText = $result.text();
          const resultNumber = parseInt(resultText);
          expect(resultNumber).to.be.within(0, 100);
        });
      }
    });
  });
});