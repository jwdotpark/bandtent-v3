import { exampleHandler } from './api/example'
import { commentHandler } from './api/post/comment/get'
import { unPubHandler } from './api/post/unpub'

export const handlers = [...exampleHandler, ...commentHandler, ...unPubHandler]
