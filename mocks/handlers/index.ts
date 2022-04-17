import { exampleHandler } from './api/example'
import { commentHandler } from './api/post/comment/get'

export const handlers = [...exampleHandler, ...commentHandler]
