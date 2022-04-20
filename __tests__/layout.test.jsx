import { render, screen } from './test-utils'
import Main from '../pages/index'

describe('Main', () => {
  it('has loadmore button', async () => {
    render(<Main />)
    const loadMore = await screen.findByText('Load More')
    expect(loadMore).toBeInTheDocument()
  })
})
