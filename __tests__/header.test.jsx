import { act, fireEvent, render, screen, waitFor } from './test-utils'
import Header from '../components/Layout'
import SearchButton from '../components/nav/SearchButton'

// FIXME
// probably msw related issue
/*
 TypeError: Network request failed
      at node_modules/whatwg-fetch/dist/fetch.umd.js:535:18
      at Timeout.task [as _onTimeout] (node_modules/jsdom/lib/jsdom/browser/Window.js:516:19)
*/

describe.skip('Header Component with session has', () => {
  it('elements', async () => {
    render(<Header />)
    const feed = await screen.findByText('Feed')
    // const add = await screen.findByText('Add')
    const search = await screen.findByPlaceholderText('Search')
    const themeButton = await screen.findByTestId('themeButton')

    await waitFor(() => {
      expect(feed).toBeInTheDocument()
      // expect(add).toBeInTheDocument()
      expect(search).toBeInTheDocument()
      expect(themeButton).toBeInTheDocument()
    })
  })
})

describe.skip('Search button', () => {
  it('can not be triggered with empty string', async () => {
    const mockOnSubmit = jest.fn()
    render(<SearchButton onClick={mockOnSubmit} />)
    await act(async () => {
      fireEvent.click(screen.getByPlaceholderText('Search'), {
        target: { value: '' },
      })
    })
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(mockOnSubmit).toHaveBeenCalledTimes(0)
  })
})
