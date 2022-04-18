import { exampleHandler } from './api/example'
import { commentHandler } from './api/post/comment/get'
import { unPubHandler } from './api/post/unpub'
import { sessionHandler } from './api/auth/session'
import { countHandler } from './api/post/count'
import { myPostHandler } from './api/post/mypost/id'
import { commentPropHandler } from './api/post/comment'
import { publishHandler } from './api/publish/unpublish'

export const handlers = [
  ...exampleHandler,
  ...commentHandler,
  ...unPubHandler,
  ...sessionHandler,
  ...countHandler,
  ...myPostHandler,
  ...commentPropHandler,
  ...publishHandler,
]
