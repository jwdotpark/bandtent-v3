import { rest } from 'msw'

// const imageUrl =
//   'https://bandtentbucket.s3.eu-central-1.amazonaws.com/next-s3-uploads/6c11bbdc-503d-4c5e-be32-b666388dabbb/DJ_PYTHON_TE_CONOCI.png'

export const uploadHandler = [
  rest.put(
    'https://bandtentbucket.s3.eu-central-1.amazonaws.com/next-s3-uploads/*',
    (req, res, ctx) => {
      return res(ctx.status(200))
    }
  ),
]
