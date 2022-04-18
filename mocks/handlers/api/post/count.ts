import { rest } from 'msw'

// response with unpublished post id
const count = 10

export const countHandler = [
  rest.get('/api/post/count', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(count))
  }),
]
