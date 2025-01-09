const app = require("../index");
const request = require("supertest")
const db = require("../config/memory.test")

beforeAll(async () => {
    await db()
});

afterEach(async () => {
    await db.clearDatabase()
});

afterAll(async () => {
    await db.closeDatabase()
});

describe('Auth API', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                first_name: 'Test',
                last_name: 'User',
                password: 'password123',
                password_confirm: 'password123'
            });
        expect(res.statusCode).toEqual(201);
    });

    it('should login an existing user', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                first_name: 'Test',
                last_name: 'User',
                password: 'password123',
                password_confirm: 'password123'
            });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('access_token');
    });

    it('should logout a user', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                first_name: 'Test',
                last_name: 'User',
                password: 'password123',
                password_confirm: 'password123'
            });

        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });

        const res = await request(app)
            .post('/api/auth/logout')
            .set('Cookie', `refresh_token=${loginRes.headers['set-cookie'][0].split(';')[0].split('=')[1]}`);
        expect(res.statusCode).toEqual(204);
    });

    it('should refresh the access token', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                first_name: 'Test',
                last_name: 'User',
                password: 'password123',
                password_confirm: 'password123'
            });

        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });

        const res = await request(app)
            .post('/api/auth/refresh')
            .set('Cookie', `refresh_token=${loginRes.headers['set-cookie'][0].split(';')[0].split('=')[1]}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('access_token');
    });

    it('should get the user details', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                first_name: 'Test',
                last_name: 'User',
                password: 'password123',
                password_confirm: 'password123'
            });

        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });

        const res = await request(app)
            .get('/api/auth/user')
            .set('Authorization', `Bearer ${loginRes.body.access_token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('email', 'testuser@example.com');
    });
});

