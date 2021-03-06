// use "window.fetch" used in the React component in node
import 'whatwg-fetch'

import '@testing-library/jest-dom/extend-expect'
import { mswServer } from './mocks/mswServer'

if (process.env.NODE_ENV === 'production') {
  beforeAll(() => {
    mswServer.listen({ onUnhandledRequest: 'error' })
  })

  afterAll(() => {
    mswServer.close()
  })

  afterEach(() => {
    mswServer.resetHandlers()
  })
}
