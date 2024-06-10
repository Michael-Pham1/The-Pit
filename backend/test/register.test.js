
const request = require('supertest');
const app = require('../api/index'); // Assuming your index.js is in the parent directory
const User = require('../models/User');

describe('Registration Endpoint', () => {
    // Clear the test database before each test
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/api/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                uid: 'testuid123',
                displayPicture: 'https://example.com/pic.jpg',
                bio: 'Test bio',
                created: new Date(),
                win: 0,
                lose: 0
            });

        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Test User');
        // Add more assertions as needed
    });

    it('should return error for existing user', async () => {
        // Add a user with the same UID to the database before making the request
        const existingUser = new User({
            name: 'Existing User',
            email: 'existing@example.com',
            uid: 'testuid123',
            displayPicture: 'https://example.com/pic.jpg',
            bio: 'Test bio',
            created: new Date(),
            win: 0,
            lose: 0
        });
        await existingUser.save();

        const res = await request(app)
            .post('/api/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                uid: 'testuid123',
                displayPicture: 'https://example.com/pic.jpg',
                bio: 'Test bio',
                created: new Date(),
                win: 0,
                lose: 0
            });

        expect(res.status).toBe(422);
        expect(res.body.error).toBe('User already exists!');
    });

    // Add more test cases as needed
});