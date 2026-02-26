process.env.JWT_SECRET = 'test_secret';

const request = require('supertest');
const app = require('../src/app');

const randomAccount = () => `u${Date.now()}${Math.floor(Math.random() * 1000)}`;

describe('Auth API', () => {
  it('register + login flow should work', async () => {
    const account = randomAccount();
    const password = 'abc12345';

    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ account, password, nickname: 'test' });

    expect([201, 409]).toContain(registerRes.statusCode);

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ account, password });

    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.token).toBeTruthy();

    const profileRes = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${loginRes.body.token}`);

    expect(profileRes.statusCode).toBe(200);
    expect(profileRes.body.user.account).toBe(account);
  });
});
