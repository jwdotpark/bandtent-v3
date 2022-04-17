import { rest } from 'msw'

export const exampleHandler = [
  rest.get('/api/example', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'this is intercepted message!!',
      })
    )
  }),
]
