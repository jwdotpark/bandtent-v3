import { rest } from 'msw'
// import assets from '../../../assets'

const createPostResponse = {
  id: 137,
  title: 'test artist',
  content: 'test title',
  published: false,
  authorId: 1,
  createdAt: '2022-04-18T19:54:44.670Z',
  imageUrl:
    'https://bandtentbucket.s3.eu-central-1.amazonaws.com/next-s3-uploads/20241f18-1442-4576-bfe7-931abe895884/DJ_PYTHON_TE_CONOCI.png',
  fileUrl:
    'https://bandtentbucket.s3.eu-central-1.amazonaws.com/next-s3-uploads/e0f0541b-b667-4344-a73c-5ecc4b4f187e/Nikki-Nair%2C-DJ-ADHD---Startrack.mp3',
}

export const createHandler = [
  rest.post('/api/post', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(createPostResponse))
  }),
]
