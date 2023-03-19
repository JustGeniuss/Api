import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;
beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register - error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: 'a@a.ru', password: '1' });
		expect(res.statusCode).toBe(422);
	});

	it('Login - success', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'bbba@a.ru', password: '1' });
		expect(res.body.jwt).not.toBeUndefined();
	});

	it('Login - fail', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'bbba@a.ru', password: '2' });
		expect(res.body.jwt).toBeUndefined();
		expect(res.statusCode).toBe(401);
	});

	it('info - success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'bbba@a.ru', password: '1' });

		const res = await request(application.app)
			.get('/users/info')
			.set({ authorization: 'Bearer ' + login.body.jwt });
		expect(res.statusCode).toBe(200);
		expect(res.body.email).toBe('bbba@a.ru');
	});

	it('info - failed authorization', async () => {
		const res = await request(application.app).get('/users/info');
		expect(res.statusCode).toBe(401);
		expect(res.body.email).toBeUndefined();
	});
});

afterAll(() => {
	application.close();
});
