import {app} from '../app'
import request from 'supertest';

describe('GET /api/purchase', () => {

    test('should response with a 200 status code with all the purchases', async () => {

        const customerPost = await request(app).get('/api/purchases').send();

        expect(customerPost.statusCode).toBe(200);

    });

    test('Should response with a 200 status code with purchases from a customer', async () => {

        const customerPost = await request(app).get('/api/purchases/100').send();

        expect(customerPost.statusCode).toBe(200);

    });

    test('Should response with a 404 status code', async () => {

        const customerPost = await request(app).post('/api/purchases/0').send();

        expect(customerPost.statusCode).toBe(404);

    });




});

describe('POST /api/purchase', () => {


    test('should response with a 200 status code with the creation of customer', async () => {

        const payload = {
            "email": "pabloariata2@gmail.com",
            "name": "Pablo",
            "card": "1111222233334444",
            "password": "123456"
        }

        const customerPost = await request(app).post('/api/purchases').send(payload);

        expect(customerPost.statusCode).toBe(400);

    });

    test('should response with a 400 status code for bad request', async () => {

        const badPayload = {
            "email": "pablogmail",
            "name": "Pablo",
            "card": "1111222233334444",
            "password": "123456"
        }

        const customerPost = await request(app).post('/api/purchases').send(badPayload);

        expect(customerPost.statusCode).toBe(400);

    });






});
