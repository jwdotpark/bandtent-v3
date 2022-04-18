import { rest } from 'msw'
import assets from '../../../../assets'

const unpublishRes = {
  id: 134,
  title: 'test',
  content: 'test',
  published: false,
  authorId: 1,
  createdAt: '2022-04-17T13:49:17.058Z',
  imageUrl: assets.imageUrl,
  fileUrl: assets.fileUrl,
}

const publishRes = {
  id: 134,
  title: 'Farsight',
  content: 'Renegade(Interplanetary Criminal Remix Edit)',
  published: true,
  authorId: 1,
  createdAt: '2022-04-17T13:49:17.058Z',
  imageUrl: assets.imageUrl,
  fileUrl: assets.fileUrl,
}

export const publishHandler = [
  rest.post('/api/publish/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(publishRes))
  }),
  rest.post('/api/publish/unpublish/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(unpublishRes))
  }),
]
