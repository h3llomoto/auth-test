import { rest } from 'msw';

const users = [
  {
    name: 'Ivan',
    login: 'ivan',
    password: 'ivan',
    birthday: '1993-02-25'
  },
  {
    name: 'Petr',
    login: 'petr',
    password: 'petr',
    birthday: '1998-04-10',
  },
];

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    const body = await req.json();
    const userFound = users.find(
      (user) => user.login === body.login && user.password === body.password,
    );

    if (!userFound) {
      return res(
        ctx.status(401),
        ctx.json({
          errorMessage: 'The email address or password is incorrect',
        }),
      );
    }

    sessionStorage.setItem('login', userFound.login);

    return res(
      ctx.status(200),
      ctx.json(userFound),
    );
  }),
  rest.get('/auth', (req, res, ctx) => {
    const login = sessionStorage.getItem('login');
    const userFound = users.find((user) => user.login === login);

    if (!userFound) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json(userFound),
    );
  }),
];
