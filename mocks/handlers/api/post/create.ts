import { rest } from 'msw'
// import assets from '../../../assets'

export const createHandler = [
  rest.post('/api/post', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'this is intercepted message!!',
      })
    )
  }),
]
