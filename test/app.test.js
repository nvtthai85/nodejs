const request = require('supertest');
const app = require('../app'); // Import ứng dụng chính

describe('GET /', () => {
  it('should return Hello World', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Hello World');
  });
});