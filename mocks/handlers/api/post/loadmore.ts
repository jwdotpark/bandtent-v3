import { rest } from 'msw'
// import assets from '../../../assets'

const loadMoreProp = {
  id: 131,
  title: 'Green-House',
  content: 'Sansevieria',
  published: true,
  authorId: 1,
  createdAt: '2022-04-16T16:40:05.226Z',
  imageUrl:
    'https://bandtentbucket.s3.eu-central-1.amazonaws.com/next-s3-uploads/908c7714-a668-4c0d-8479-c67b41b41b6c/greenhouse-sanseveria.png',
  fileUrl:
    'https://bandtentbucket.s3.eu-central-1.amazonaws.com/next-s3-uploads/acd93cd6-a9eb-4430-8d54-0411ce674efb/Green-House---Sansevieria.mp3',
  author: {
    name: 'actual db user',
    image: 'https://avatars.githubusercontent.com/u/38537908?v=4',
  },
  comments: [
    {
      id: 247,
      content:
        'Botanisch gehört Sansevieria zur Familie der Spargelgewächse (Asparagaceae) und ist somit eng verwandt mit dem Drachenbaum. Der botanische Name Sansevieria ehrt ...',
      userId: 1,
      postId: 131,
      createdAt: '2022-04-16T16:40:31.631Z',
    },
    {
      id: 248,
      content:
        'In composing radiant new-age music inspired by plants, the Los Angeles-based musician encourages a sense of empathy with nonhuman life.',
      userId: 1,
      postId: 131,
      createdAt: '2022-04-16T16:40:41.843Z',
    },
  ],
}
export const loadMoreHandler = [
  rest.post('/api/post/loadmore', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(loadMoreProp))
  }),
]
