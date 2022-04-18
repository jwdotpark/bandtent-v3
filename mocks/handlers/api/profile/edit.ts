import { rest } from 'msw'
import assets from '../../../assets'

const editProfileResponse = {
  id: 1,
  name: 'Mocked User from edit',
  email: 'test@test.test',
  createdAt: '2022-03-16T16:16:34.951Z',
  updatedAt: '2022-04-18T17:53:06.852Z',
  emailVerified: '2022-04-15T18:50:03.187Z',
  image: assets.imageUrl,
  description:
    "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
  location: 'Berlin, DE',
  website: 'https://google.com',
}

export const profileEditHandler = [
  rest.put('/api/profile/edit', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(editProfileResponse))
  }),
]
