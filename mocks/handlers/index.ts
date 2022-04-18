import { exampleHandler } from './api/example'
import { commentHandler } from './api/post/comment/get'
import { unPubHandler } from './api/post/unpub'
import { sessionHandler } from './api/auth/session'
import { countHandler } from './api/post/count'

export const handlers = [
  ...exampleHandler,
  ...commentHandler,
  ...unPubHandler,
  ...sessionHandler,
  ...countHandler,
]
