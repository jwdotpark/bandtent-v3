import { rest } from 'msw'
// import assets from '../../../../assets'

const commentProp = [
  {
    userId: 1,
    content: 'this is test comment',
    postid: 1,
  },
]

export const commentPropHandler = [
  rest.post('/api/post/comment', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(commentProp))
  }),
]
