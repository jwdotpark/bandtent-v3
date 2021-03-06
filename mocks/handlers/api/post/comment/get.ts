import { rest } from 'msw'

export const commentHandler = [
  rest.get('/api/post/comment/get', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(commentProp))
  }),
]

const commentProp = [
  {
    id: 251,
    content: 'this is intercepted prop',
    userId: 2,
    postId: 135,
    createdAt: '2022-04-17T15:29:36.741Z',
    User: {
      id: 2,
      name: 'okgu',
      email: 'brainfeeders@gmail.com',
      createdAt: '2022-03-16T16:18:19.472Z',
      updatedAt: '2022-04-16T15:01:13.480Z',
      emailVerified: '2022-04-16T15:01:13.478Z',
      image: '',
      description:
        'Hi this is description test, it should be less than 800 char Hi this is description test, it should be less than 800 char Hi this is description test, it should be less than 800 char Hi this is description test, it should be less than 800 char Hi this is description test, it should be less than 800 char Hi this is description test, it should be less than 800 char Hi this is description test',
      location: 'Berlin, DE',
      website: 'https://okgu.com',
    },
    Post: {
      title: 'DJ Badshape, Stormskater',
      content: 'Hurrican Kick',
    },
  },
  {
    id: 250,
    content:
      'testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing ',
    userId: 4,
    postId: 135,
    createdAt: '2022-04-17T14:12:39.035Z',
    User: {
      id: 4,
      name: 'Test Account',
      email: 'jongwoodotparkkr@gmail.com',
      createdAt: '2022-03-18T12:43:30.326Z',
      updatedAt: '2022-04-12T12:54:31.818Z',
      emailVerified: null,
      image: '',
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      location: 'Los Angeles, US',
      website: 'http://test.com',
    },
    Post: {
      title: 'DJ Badshape, Stormskater',
      content: 'Hurrican Kick',
    },
  },
  {
    id: 249,
    content:
      'Die Wortf??gung wurde gebildet aus dem lateinischen do\u200cl??rem (Schmerz) und ipsum (selbst) aus dem mehrb??ndigen Werk "De finibus bonorum et malorum", Liber Primus, (erstes Buch) 1:32 (erster Absatz, Zeile 32) des r??mischen Philosophen, Politikers und Schriftstellers Cicero. Der Text ist weder nach Wortwahl oder Schreibung nach echtes Latein, die meisten Worte gibt es gar nicht, das gilt auch ',
    userId: 1,
    postId: 133,
    createdAt: '2022-04-17T13:19:44.095Z',
    User: {
      id: 1,
      name: 'Some User',
      email: 'jongwoo.park@code.berlin',
      createdAt: '2022-03-16T16:16:34.951Z',
      updatedAt: '2022-04-15T18:50:03.189Z',
      emailVerified: '2022-04-15T18:50:03.187Z',
      image: 'https://avatars.githubusercontent.com/u/38537908?v=4',
      description:
        "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
      location: 'Berlin, DE',
      website: 'https://google.com',
    },
    Post: {
      title: 'Human Resources',
      content: 'Steady On',
    },
  },
  {
    id: 248,
    content:
      'In composing radiant new-age music inspired by plants, the Los Angeles-based musician encourages a sense of empathy with nonhuman life.',
    userId: 1,
    postId: 131,
    createdAt: '2022-04-16T16:40:41.843Z',
    User: {
      id: 1,
      name: 'Some User',
      email: 'jongwoo.park@code.berlin',
      createdAt: '2022-03-16T16:16:34.951Z',
      updatedAt: '2022-04-15T18:50:03.189Z',
      emailVerified: '2022-04-15T18:50:03.187Z',
      image: '',
      description:
        "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
      location: 'Berlin, DE',
      website: 'https://google.com',
    },
    Post: {
      title: 'Green-House',
      content: 'Sansevieria',
    },
  },
  {
    id: 247,
    content:
      'Botanisch geh??rt Sansevieria zur Familie der Spargelgew??chse (Asparagaceae) und ist somit eng verwandt mit dem Drachenbaum. Der botanische Name Sansevieria ehrt ...',
    userId: 1,
    postId: 131,
    createdAt: '2022-04-16T16:40:31.631Z',
    User: {
      id: 1,
      name: 'Some User',
      email: 'jongwoo.park@code.berlin',
      createdAt: '2022-03-16T16:16:34.951Z',
      updatedAt: '2022-04-15T18:50:03.189Z',
      emailVerified: '2022-04-15T18:50:03.187Z',
      image: '',
      description:
        "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
      location: 'Berlin, DE',
      website: 'https://google.com',
    },
    Post: {
      title: 'Green-House',
      content: 'Sansevieria',
    },
  },
  {
    id: 246,
    content:
      'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, ',
    userId: 1,
    postId: 125,
    createdAt: '2022-04-16T15:35:22.504Z',
    User: {
      id: 1,
      name: 'Some User',
      email: 'jongwoo.park@code.berlin',
      createdAt: '2022-03-16T16:16:34.951Z',
      updatedAt: '2022-04-15T18:50:03.189Z',
      emailVerified: '2022-04-15T18:50:03.187Z',
      image: '',
      description:
        "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
      location: 'Berlin, DE',
      website: 'https://google.com',
    },
    Post: {
      title: 'Roman Fl??gel',
      content: 'Pattern Two',
    },
  },
  {
    id: 245,
    content:
      '???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
    userId: 1,
    postId: 130,
    createdAt: '2022-04-16T15:33:38.166Z',
    User: {
      id: 1,
      name: 'Some User',
      email: 'jongwoo.park@code.berlin',
      createdAt: '2022-03-16T16:16:34.951Z',
      updatedAt: '2022-04-15T18:50:03.189Z',
      emailVerified: '2022-04-15T18:50:03.187Z',
      image: '',
      description:
        "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
      location: 'Berlin, DE',
      website: 'https://google.com',
    },
    Post: {
      title: 'Walton',
      content: 'Rewind Riddim',
    },
  },
  {
    id: 244,
    content:
      ' ?????????? ???????????? ?????????? ?????? ????????, ???????????? ?????????????????????? ???? ??????, ?????? ?????????? ???????????? ?????????????????????????? ????, ?????? ???????????????? ???????????????? ????. ?????????????????? ???????????????????? ???????????????????? ?????? ????.',
    userId: 1,
    postId: 130,
    createdAt: '2022-04-16T15:33:32.153Z',
    User: {
      id: 1,
      name: 'Some User',
      email: 'jongwoo.park@code.berlin',
      createdAt: '2022-03-16T16:16:34.951Z',
      updatedAt: '2022-04-15T18:50:03.189Z',
      emailVerified: '2022-04-15T18:50:03.187Z',
      image: '',
      description:
        "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
      location: 'Berlin, DE',
      website: 'https://google.com',
    },
    Post: {
      title: 'Walton',
      content: 'Rewind Riddim',
    },
  },
  {
    id: 243,
    content:
      ' ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
    userId: 1,
    postId: 130,
    createdAt: '2022-04-16T15:33:25.916Z',
    User: {
      id: 1,
      name: 'Some User',
      email: 'jongwoo.park@code.berlin',
      createdAt: '2022-03-16T16:16:34.951Z',
      updatedAt: '2022-04-15T18:50:03.189Z',
      emailVerified: '2022-04-15T18:50:03.187Z',
      image: '',
      description:
        "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
      location: 'Berlin, DE',
      website: 'https://google.com',
    },
    Post: {
      title: 'Walton',
      content: 'Rewind Riddim',
    },
  },
  {
    id: 242,
    content:
      ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pharetra lorem molestie, luctus erat vitae, volutpat velit. Proin vitae sagittis lacus. Suspendisse tincidunt ipsum quis erat scelerisque porta. Curabitur auctor justo a odio consequat gravida. Sed imperdiet semper pulvinar. Praesent tempus lorem sit amet eleifend ornare. ',
    userId: 1,
    postId: 130,
    createdAt: '2022-04-16T15:33:06.105Z',
    User: {
      id: 1,
      name: 'Some User',
      email: 'jongwoo.park@code.berlin',
      createdAt: '2022-03-16T16:16:34.951Z',
      updatedAt: '2022-04-15T18:50:03.189Z',
      emailVerified: '2022-04-15T18:50:03.187Z',
      image: '',
      description:
        "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
      location: 'Berlin, DE',
      website: 'https://google.com',
    },
    Post: {
      title: 'Walton',
      content: 'Rewind Riddim',
    },
  },
]
