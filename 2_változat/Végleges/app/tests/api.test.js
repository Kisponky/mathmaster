const supertest = require('supertest');
const app = require('../app');
const { receiveMessageOnPort } = require('worker_threads');

const loadChai = async () => {
    const { expect } = await import('chai');
    return expect;
};


const request = supertest('http://localhost:8000');

describe('API Végpontok Tesztelése', () => {
    let expect;

    before(async () => {
        expect = await loadChai();
    });

    it('Visszaadja az üzenetet a /protected végpontra tett GET kérésre', async () => {
        const response = await request.get('/users/protected'); 
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Ez egy védett útvonal.');
    });

    it('Sikeres regisztráció', async () => {
        const userData = {
            fullName: 'Teszt Felhasználó',
            userName: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        };

        const response = await request.post('/users/register')
            .send(userData);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status').to.equal(200);
        expect(response.body).to.have.property('success').to.equal('Sikeres adatrögzítés');
    });

    let authToken; 
    let adminAuthToken; 

    it('Sikeres belépés esetén JWT tokent ad vissza', async () => {
        const userData = {
            email: 'test@example.com',
            jelszo: 'password123'
        };

        const response = await request.post('/users/login')
            .send(userData);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');


        authToken = response.body.token; 
    });

    it('Sikeres belépés esetén JWT tokent ad vissza admin belépésre', async () => {
        const userData = {
            email: 'admin@example.com',
            jelszo: 'password123'
        };

        const response = await request.post('/users/login')
            .send(userData);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');


        adminAuthToken = response.body.token; 
    });

    it('Felhasználónév frissítése sikeres', async () => {
        const randomUsername = "username" + Math.round(Math.random() * 100);

        const response = await request.put('/users/update-username')
            .set('Authorization', `${authToken}`)
            .send({ username: randomUsername });

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('success').to.be.true;
        expect(response.body).to.have.property('message').to.equal('Felhasználónév sikeresen frissítve');
    });

    it('Sikertelen admin jog hozzáadása nem megfelelő jogosultsággal', async () => {
        const addAdminResponse = await request.post('/users/newAdmin')
            .set('Authorization', `${authToken}`)
            .send({ email: "test@example.com" });

        expect(addAdminResponse.status).to.equal(403);
        expect(addAdminResponse.body).to.have.property('error').to.equal(`Hozzáférés megtagadva. Admin jogosultságok szükségesek.`);
    });

    it('Sikeres felhasználó törlés', async () => {
        const deleteUserResponse = await request.delete('/users/deleteProfile')
            .set('Authorization', `${authToken}`); 

        expect(deleteUserResponse.status).to.equal(200);
        expect(deleteUserResponse.body).to.have.property('success').to.be.true;
        expect(deleteUserResponse.body).to.have.property('message').to.equal('Felhasználó sikeresen törölve');
    });
});

