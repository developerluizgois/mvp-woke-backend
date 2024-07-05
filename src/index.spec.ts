import request from 'supertest';
import server from '.';

describe('Testing the server', () => {
  it('GET /api should return status 200 and a message', async () => {
    const res = await request(server).get('/api');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'OK', message: 'Server is up and running.' });
  });

  it('should return status 404 for an unknown route', async () => {
    const res = await request(server).get('/unknown-route');
    expect(res.status).toBe(404);
    expect(res.body.error).toEqual({
      status: 404,
      message: 'Route not found',
    });
  });

  it('should return status 500 for internal errors', async () => {
    const res = await request(server).get('/api/error');
    expect(res.status).toBe(500);
    expect(res.body.error).toEqual({
      status: 500,
      message: 'Internal server error',
    });
  });
});
