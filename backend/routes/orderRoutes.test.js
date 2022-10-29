import app from '../server' 
import request from 'supertest'
jest.useFakeTimers()

let token;  

beforeAll((done) => {
    request(app)
        .post('/api/users/login')
        .send({
            email: 'jeff@email.com',
            password: '123456'
        })
        .end((err, response) => {
            token =  response.body.token;
            done();
        });
});



describe('app', () => {

    it('Index should return 200 Status', () => {
        return request(app)
            .post('/api/users/login')
            .send({
                email: 'jeff@email.com',
                password: '123456'
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
            });
    });

    it('Index should return 401 Status wrong creds', () => {
        return request(app)
            .post('/api/users/login')
            .send({
                email: 'jeff@email.com',
                password: '12356'
            })
            .then((response) => {
                expect(response.statusCode).toBe(401);
            });
    });

    it('Index should return 400 Status not complete user', () => {
        return request(app)
            .post(' /api/users')
            .send({
                email: 'jeff@email.com',
                password: '123456',
                company: 'shell',
                states: 'Tx'
            })
            .then((response) => {
                expect(response.statusCode).toBe(400);
            });
    });


    it('Index should return 401 Status invalid token', () => {
        return request(app)
            .get('/api/users/login')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(401); 
            });
    });

    it('Index should return 401 Status no token', () => {
        return request(app)
            .get('/api/users/login')
            .then((response) => {
                expect(response.statusCode).toBe(401); 
            })
    });

    it('Index should return 200 Status', () => {
        return request(app)
            .get('/')
            .then((response) => {
                expect(response.statusCode).toBe(200);
            });
    });


    it('Index should return 200 Status', () => {
        return request(app)
            .get('/api/upload')
            .then((response) => {
                expect(response.statusCode).toBe(404);
            });
    });

    test('Index shoudl return 200 for login', () => {
        return request(app)
            .get('/')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('text/html');
            });
    });



});

