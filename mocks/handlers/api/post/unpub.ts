import { rest } from 'msw'

// response with unpublished post id
const unpub = 1

export const unPubHandler = [
  rest.get('/api/profile/unpub', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(unpub))
  }),
]
