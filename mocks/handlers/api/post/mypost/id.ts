import { rest } from 'msw'

const myPost = {
  id: 1,
  name: 'Some User',
  email: 'jongwoo.park@code.berlin',
  createdAt: '2022-03-16T16:16:34.951Z',
  updatedAt: '2022-04-15T18:50:03.189Z',
  emailVerified: '2022-04-15T18:50:03.187Z',
  image: '',
  description: 'test',
  location: 'Berlin, DE',
  website: 'https://google.com',
  posts: [
    {
      id: 134,
      title: 'Test artist',
      content: 'some audio',
      published: true,
      authorId: 1,
      createdAt: '2022-04-17T13:49:17.058Z',
      imageUrl: 'https://placekitten.com/400/400',
      fileUrl: 'https://freesound.org/data/previews/628/628608_13598778-lq.mp3',
    },
    {
      id: 133,
      title: 'Some Other testing material',
      content: 'asdf asdf',
      published: true,
      authorId: 1,
      createdAt: '2022-04-17T13:18:24.773Z',
      imageUrl: 'https://placekitten.com/400/400',
      fileUrl: 'https://freesound.org/data/previews/628/628608_13598778-lq.mp3',
    },
  ],
}

export const myPostHandler = [
  // same response with every request
  rest.get('/api/post/mypost/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(myPost))
  }),
]
