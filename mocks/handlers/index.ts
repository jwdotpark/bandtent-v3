import { postHandlers } from './api/post/create'
import { commentHandlers } from './api/comment/post'

export const handlers = [...postHandlers, ...commentHandlers]
