import { rest } from 'msw'
import assets from '../../../assets'

export const etcHandler = [
  rest.get(
    'https://bandtentbucket.s3.eu-central-1.amazonaws.com/*',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(assets.imageUrl))
    }
  ),
  rest.get('https://lh3.googleusercontent.com/*', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(assets.imageUrl))
  }),
]
