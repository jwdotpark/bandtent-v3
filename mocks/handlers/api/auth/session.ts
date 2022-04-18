import { rest } from 'msw'

const session = {
  session: {
    user: {
      name: 'Mocked Test Account',
      email: 'test@test.com',
      image: '',
    },
    expires: '2022-05-17T17:22:04.758Z',
  },
  user: {
    id: 1,
    name: 'Mocked Test Account',
    email: 'jongwoo.park@code.berlin',
    createdAt: '2022-03-16T16:16:34.951Z',
    updatedAt: '2022-04-15T18:50:03.189Z',
    emailVerified: '2022-04-15T18:50:03.187Z',
    image: '',
    description: 'test',
    location: 'Berlin, DE',
    website: 'https://google.com',
  },
}

export const sessionHandler = [
  rest.get('/api/auth/session', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(session))
  }),
]
