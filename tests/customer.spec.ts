import {app} from '../app'
import request from 'supertest';

describe('GET /api/customers', () => {

    test('should response with a 200 status code with all the customers in DB', async () => {


        const customersGet = await request(app).get('/api/customers').send();

        expect(customersGet.statusCode).toBe(200);

        // console.log(customersGet);

    });

});

describe('GET /api/customers', () => {

    test('should response with a 200 status code with the customer with that id', async () => {


        const customersGet = await request(app).get('/api/customers/100').send();

        expect(customersGet.statusCode).toBe(200);

        // console.log(customersGet);

    });

});

describe('GET /api/customers/:id',  () => {

    test('should response with a 404 status code because of an inexisting id', async () => {


        const customersGet = await request(app).get('/api/customers/0').send();

        expect(customersGet.statusCode).toBe(404);

        // console.log(customersGet);

    });

    test('should response with a 404 status code for invalid id', async () => {


        const customersGet = await request(app).get('/api/customers/asd').send();

        expect(customersGet.statusCode).toBe(404);

        // console.log(customersGet);

    });

});

describe('POST /api/customers/',  () => {

    test('should response with a 200 status code after creating a customer', async () => {

        const payload = {
            "email": "pabloariata2@gmail.com",
            "name": "Pablo",
            "card": "1111222233334444",
            "password": "123456"
        }


        const customersGet = await request(app).post('/api/customers').send(payload);

        expect(customersGet.statusCode).toBe(200);

        // console.log(customersGet);

    });

    test('should response with a 400 status code for invalid data on payload', async () => {

        const badPayload = {
            "email": "pabloariatagmail",
            "name": "Pablo",
            "card": "1111222233334444",
            "password": "123456"
        }

        const customersGet = await request(app).post('/api/customers/asd').send(badPayload);

        expect(customersGet.statusCode).toBe(404);

        // console.log(customersGet);

    });

});