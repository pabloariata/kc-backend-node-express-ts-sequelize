import {app} from '../app'
import request from 'supertest';

describe('GET /api/products',  () => {

    test('should response with a 200 status code with all the products in DB', async () => {


        const productsGet = await request(app).get('/api/products').send();

        expect(productsGet.statusCode).toBe(200);


        // console.log(productsGet);

    });

});
